<template>
  <div class="pages">
    <header class="title-2">
      <span class="set-title">ÜYE DETAY</span>
    </header>
<!-- general info section------------------------------- -->
    <ul v-if="checkUser" class="account-con">
      <section class="user-id-section">
        <h1 class="userdetails-title">
          <i class="fas fa-user fa-3x cl-g"/>
          <span class="userdetails-title-text">{{ users.user | capitalize}}</span>
        </h1>
        <error v-if="error" :message="error" class="error user-error"/>
        <li class="userdetails-items">
          <span class="userdetails-text">Kayıt Tarihi</span>
          <span class="edit-value">{{ users.date | fullFormat }}</span>
        </li>
        <li class="userdetails-items">
          <span class="userdetails-text">Durum</span>
          <select v-model="users.state" class="input-half">
            <option value="aktif" selected>Aktif</option>
            <option value="pasif">Pasif</option>
          </select>
          <i v-if="save === 'state'" class="fa fa-thumbs-up fa-2x cl-g slbs" />
          <i v-if="save !== 'state'" class="fa fa-save fa-2x edit-save cl-f"  @click="updateState()"/>
        </li>
        <li v-if="checkSuperadmin || checkBoss" class="userdetails-items">
          <span class="userdetails-text">Ödeme</span>
          <div class="form-rows nick-input">
            <span class="edit-value">{{ users.payment | fullFormat }}</span>
          </div>
          <i v-if="done === 'payment'" class="fa fa-thumbs-up fa-2x cl-g slbs"  />
          <i v-if="done !== 'payment'" class="fa fa-save fa-2x edit-save cl-f" @click="updatePayment()"/>
        </li>
        <li class="userdetails-trash">
          <i v-if="!isLoader" class="fa fa-trash fa-2x cl-r"  @click="deleteUser(users.user)"/>
          <img v-if="isLoader" src="~/static/img/loader.gif" alt="" class="welcome-loader">
        </li>
      </section>

<!-- Admin-u1 section------------------------------- -->
    <section v-if="checkAdmin" class="user-id-section">
      <li class="userdetails-items">
        <span class="userdetails-text">Bakiye</span>
        <span class="userdetails-text">{{users.creditremain | currency('', 2)}}</span>
      </li>
      <li class="userdetails-items">
        <span class="userdetails-text">Bakiye Ekle/Çıkar</span>
        <input v-model="updateAmount" type="number" class="input-half" min="0" @focus="errorcredit = ''" required>
        <div v-if="this.done !== 'ucstart' && done !== 'ucdone'">
          <i class="fas fa-minus-square  fa-2x cl-r slbs" @click="updateCreditRemain('minus')"/>
          <i class="fas fa-plus-square  fa-2x cl-g slbs" @click="updateCreditRemain('plus')"/>
        </div>
        <img src="~/static/img/loader.gif" alt="" v-if="done === 'ucstart'" class="ml10">
        <i v-if="done === 'ucdone'" class="fa fa-thumbs-up fa-2x cl-g slbs" />
      </li>
      <li v-if="errorcredit" class="userdetails-items cl-r">{{ errorcredit }}</li>
    </section>
    <section v-if="checkSubadmin" class="user-id-section">
      <li class="userdetails-items">
        <span class="userdetails-text">Bakiye</span>
        <span class="edit-value">{{ users.creditremain | currency('', 2) }}</span>
      </li>
      <li class="userdetails-items">
        <span class="userdetails-text">Bakiye Ekle/Çıkar</span>
        <div  class="form-rows nick-input">
          <input v-model="updateAmount" type="number" min="0" class="input-half" @focus="errorcredit = ''" required>
        </div>
        <div v-if="this.done !== 'ucstart' && done !== 'ucdone'">
          <i class="fas fa-minus-square  fa-2x cl-r slbs" @click="updateCreditRemain('minus')"/>
          <i class="fas fa-plus-square  fa-2x cl-g slbs" @click="updateCreditRemain('plus')"/>
        </div>
        <img v-if="done === 'ucstart'" src="~/static/img/loader.gif" alt=""  class="user-btn">
        <i v-if="done === 'ucdone'" class="fa fa-thumbs-up fa-2x cl-g user-btn" />
      </li>
      <li v-if="errorcredit" class="userdetails-items cl-r">{{ errorcredit }}</li>
    </section>
  <!-- Boss-Superadmin section------------------------------- -->
    <section v-if="users.role === 'Superadmin' || users.role === 'Admin' || users.role === 'Subadmin'" class="user-id-section">
      <li class="userdetails-items">
        <span class="userdetails-text">Üye Limiti</span>
        <input v-model="users.userlimit" type="number" class="input-half">
        <i v-if="done === 'limit'" class="fa fa-thumbs-up fa-2x cl-g slbs" />
        <i v-if="done !== 'limit'" class="fa fa-save fa-2x edit-save cl-f" @click="updateUserLimit(users.userlimit)"/>
      </li>
      <li class="userdetails-items">
        <span class="userdetails-text">Kalan Üye Limiti</span>
        <span class="edit-value">{{ users.userlimit - users.usedlimit }}</span>
      </li>
    </section>
  </ul>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Userdetails',
  data () {
    return {
      users: {},
      isLoader: false,
      errorcredit:'',
      updateAmount:null,
      save:'',
      done:'',
      error:'',
      isLoader:false,
      checkUser:false
    }
  },
  mounted () {
    this.userDetails()
  },
  computed:{
    checkSuperadmin () {
      if (this.$store.state.auth.role === 'Superadmin') {
        return true
      }
    },
    checkBoss () {
      if (this.$store.state.auth.role === 'Boss') {
        return true
      }
    },
    checkAdmin () {
      if (this.$store.state.auth.role === 'Admin') {
        return true
      }
    },
    checkSubadmin () {
      if (this.$store.state.auth.role === 'Subadmin') {
        return true
      }
    },
    getUsedCredit (){
      return this.users.credit - this.users.creditremain
    }
  },
  filters: {
    fullFormat: (value) => {
      return moment.utc(value, 'YYYY-MM-DD H:mm:ss').tz('Europe/Istanbul').format('YYYY-MM-DD H:mm:ss')
    }
  },
  methods: {
    async userDetails () {
      await axios.get('/api/home/account/users/' + this.$route.params.id).then((result) => {
        if(result.data.users.admin === this.$store.state.auth.user){
          this.checkUser = true
          this.users = result.data.users
        }
      })
    },
    async updatePayment () {
      await axios.put('/api/home/account/updatepayment/' + this.$route.params.id, this.users).then((result) => {
        if (result.data.code === 200) {
          this.done = 'payment'
          setTimeout(() => {
            this.done = ''
          }, 1000)
        }
      })
    },
    async updateState () {
      await axios.put('/api/home/account/updatestate/' + this.$route.params.id, this.users).then((result) => {
        if (result.data.code === 200) {
          this.save = 'state'
          setTimeout(() =>{
            this.save = ''
          }, 1000)
        }
      })
    },
    async deleteUser (id) {
      const cfm = confirm('Bu kullanıcıyı ait tüm bilgiler silinecektir!')
      if(cfm){
        this.isLoader = true
        await axios.delete('/api/home/account/usersdelete/' + id).then((result) => {
          if (result.data.code === 200) {
            setTimeout(() =>{
              this.$router.push('/home/account/users')
            }, 1000)
          } else {
            this.error = result.data.message
            this.isLoader = false
            setTimeout(() => {
              this.error = ''
            }, 3000)
          }
        })
      }
    },
    async updateUserLimit (value) {
      if(value && value > 0){
        await axios.put('/api/home/account/updateuserlimit/' + this.$route.params.id, {newlimit:value}).then((result) => {
          if (result.data.code === 200) {
            this.done = 'limit'
            setTimeout(() => {
              this.done = ''
            }, 1000)
          }
        })
      } else {
        alert('Bu alan sadece pozitif sayi olabilir')
      }
    },
    updateCreditRemain (operate) {
      if (this.updateAmount && this.updateAmount > 0) {
        if(operate === 'minus'){
          if (this.updateAmount > this.users.creditremain) {
            alert('Miktar bakiyeden büyük olamaz!')
            return false
          } else {
            this.creditRemainFunction(operate)
          }
        }
        if(operate === 'plus'){
          if(this.$store.state.auth.role === 'Subadmin' && this.updateAmount > this.$store.state.betinfo.creditremain){
            alert('Yetersiz Bakiye!')
            return false
          }else{
            this.creditRemainFunction(operate)
          }
        }
      } else {
        alert('Bu alan sadece pozitif sayı olabilir')
      }
    },
    async creditRemainFunction (operate) {
      this.done = 'ucstart'
      await axios.put('/api/home/account/updatecreditremain/' + this.$route.params.id, {operate:operate,creditremain:this.users.creditremain, updateamount: this.updateAmount}).then((result) => {
        if (result.data.code === 200) {
          this.done = 'ucdone'
          setTimeout(() =>{
            this.updateAmount = null
            this.done = ''
            this.userDetails()
            this.betInfo()
          }, 1000)
          console.log(this.updateAmount)
        }else{
          this.errorcredit = result.data.message
        }
      })
    },
    async betInfo () {
      const credit = await axios.post('/api/home/account/creditinfo',{userbox:'Üyeler'})
      const subcredit = await axios.post('/api/home/account/subcredit',{userbox:'Üyeler'})
      const active = await axios.post('/api/home/account/activeinfo',{userbox:'Üyeler'})
      const won = await axios.post('/api/home/account/woninfo',{userbox:'Üyeler'})
      const total = await axios.post('/api/home/account/totalinfo',{userbox:'Üyeler'})
      const lostinfo = await axios.post('/api/home/account/lostinfo', { userbox:'Üyeler'})
      Promise.all([credit, subcredit, active, total, won, lostinfo]).then(result => {
        let final = {... result[0].data.creditinfo, ... result[1].data.subcredit, ...result[2].data.activeinfo, ...result[3].data.totalinfo, ...result[4].data.woninfo, ...result[5].data.lostinfo}
        this.$store.commit('setBetInfo',final)
      })
    }
  }
}
</script>
