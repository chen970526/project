<template>
  <div class="editpersonal">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="标题" show-cancel-button @confirm="updateNickname">
      <van-field required :value="current.nickname" label="昵称" placeholder="请输入昵称" ref="nickname" />
    </van-dialog>
    <hmcell title="密码" type="password" :desc="current.password" @click="passshow=!passshow"></hmcell>
    <van-dialog
      v-model="passshow"
      title="修改密码"
      show-cancel-button
      @confirm="updatePassword"
      :before-close="beforeClose"
    >
      <van-field required label="原密码" placeholder="请输入原密码" ref="oldPwd" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="newPwd" />
    </van-dialog>
    <hmcell title="性别" :desc="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-picker :columns="['女','男']" :default-index="current.gender" @change="onChange" />
    </van-dialog>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmcell from '@/components/hm_cell.vue'

import { uploadFile } from '@/api/uploadFile'
import { getUserInfo, editUser } from '@/api/users.js'
export default {
  components: {
    hmheader,
    hmcell
  },
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      genderIndex: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    getUserInfo(this.id)
      .then(res => {
        // console.log(res)
        if (res.data.message === '获取成功') {
          this.current = res.data.data
          // console.log(this.current)

          if (this.current.head_img) {
            this.current.head_img =
              localStorage.getItem('hm_40_baseURL') + this.current.head_img
          } else {
            this.current.head_img =
              localStorage.getItem('hm_40_baseURL') +
              '/uploads/image/default.png'
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取数据失败')
      })
  },
  methods: {
    afterRead (file) {
      //   console.log(file)

      let formdata = new FormData()
      //   console.log(formdata)
      formdata.append('file', file.file)
      uploadFile(formdata)
        .then(async res => {
          // console.log(res)
          // console.log(this.id)
          if (res.data.message === '文件上传成功') {
            let res1 = await editUser(this.id, { head_img: res.data.data.url })
            // console.log(res1)
            if (res1.data.message === '修改成功') {
              this.$toast.success('修改用户头像成功')
              // 为了即时刷新头像的显示
              this.current.head_img =
                localStorage.getItem('hm_40_baseURL') + res.data.data.url
            } else {
              this.$toast.fail('修改用户头像失败')
            }
          } else {
            this.$toast.fail('文件上传失败，请重试')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateNickname () {
      console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUser(this.id, { nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    async updatePassword () {
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      // console.log(oldPwd)
      if (this.current.password === oldPwd) {
        let password = this.$refs.newPwd.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        let res = await editUser(this.id, { password })
        console.log(res)
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
          localStorage.removeItem('heima_40_token')
          localStorage.removeItem('hm_40_baseURL')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('原始密码输入不正确')
      }
    },
    beforeClose (action, done) {
      // 1.获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      let password = this.$refs.newPwd.$refs.input.value
      if (action === 'confirm' && this.current.passshow !== oldPwd) {
        this.$toast.fail('原始密码不一样')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3~16位的新密码')
        done(false)
      } else {
        done()
      }
    },
    onChange (picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
      // console.log(picker, value, index)
      this.genderIndex = index
    },
    async updateGender () {
      // console.log(this.genderIndex)
      let res = await editUser(this.id, { gender: this.genderIndex })
      console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
// 修改元素的大小
/deep/.van-uploader__upload {
  width: 100 / 360 * 100vw;
  height: 100 / 360 * 100vw;
}
// 设置元素的对齐方式
/deep/.van-uploader {
  // 实现任意元素居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>
