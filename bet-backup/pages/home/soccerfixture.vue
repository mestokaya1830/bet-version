<template>
  <div class="pages main-page full-width">  
    <div class="odd-center">
      <header class="title-2">
       <section class="title-2-left">
         <span class="title-icons"><i class="fas fa-futbol navbar-icons cl-g" />Futbol</span>
         <span class="badge bg-g">{{leaguesLength}}</span>
         <i class="fas fa-adjust navbar-icons cp" @click="isLeagueOpen =! isLeagueOpen" title="Aç Kapa"/>
         <i class="fas fa-globe fa-lg cp cl-g" @click="resetFav()" title="Hepsi"/>
       </section>
       <input v-model="searchBox" type="search"  @input="searchFilter()" placeholder="ara...">
       {{getRateToggle}}
       <select v-model="timeBox" @change="filterAsTime()">
         <option value="Saat" disabled>Saat</option>
         <option value="all">Hepsi</option>
         <option :value="$moment().add(1,'hours').format('YYYY-MM-DD HH:mm')">1 Saat İçinde</option>
         <option :value="$moment().add(2,'hours').format('YYYY-MM-DD HH:mm')">2 Saat İçinde</option>
         <option :value="$moment().add(3,'hours').format('YYYY-MM-DD HH:mm')">3 Saat İçinde</option>
         <option :value="$moment().add(4,'hours').format('YYYY-MM-DD HH:mm')">4 Saat İçinde</option>
         <option :value="$moment().add(5,'hours').format('YYYY-MM-DD HH:mm')">5 Saat İçinde</option>
         <option :value="$moment().add(6,'hours').format('YYYY-MM-DD HH:mm')">6 Saat İçinde</option>
       </select>
       <select v-model="dateBox" @change="filterAsDate()">
         <option value="all">Hepsi</option>
         <option value="Hepsi" disabled>Hepsi</option>
         <option :value="$moment().format('YYYY-MM-DD')">Bugün</option>
         <option :value="$moment().add(1,'days').format('YYYY-MM-DD')">Yarın</option>
         <option :value="$moment().add(2,'days').format('YYYY-MM-DD')">3. Gün</option>
         <option :value="$moment().add(3,'days').format('YYYY-MM-DD')">4. Gün</option>
       </select>
      </header>
      <div class="odd-center-con">
        <div>
          <details :open="isLeagueOpen" class="odd-details cp" v-for="(list, index) in leagues" :key="index">
            <summary class="title-3 po-r">
              <div class="odd-left-title">
                <span class="flag-con">
                  <img :src="getFlags(list[0].RegionName)" class="flags">
                  <span class="leag">{{list[0].RegionName}} {{list[0].leaguename}}</span>
                </span>
                <span class="ottli-mbs">Mbs</span>
              </div>
              <div class="odd-right-title">
                <span class="ottli-title">1</span>
                <span class="ottli-title">X</span>
                <span class="ottli-title">2</span>
                <span class="ottli-title">Alt</span>
                <span class="ottli-title">Üst</span>
                <span class="ottli-title">Var</span>
                <span class="ottli-title">Yok</span>
              </div>
            </summary>
            <div class="list odd-list" v-for="(sublist, index) in list" :key="index">
              <div class="odd-left-list" @click="getOdds($event,sublist.fixtureid)">
                <span class="blli code"><span class="badge code-item">{{String(sublist.fixtureid).slice(-3)}}</span></span>
                <span class="blli date">{{sublist.startdate | moment('MM-DD')}}</span>
                 <span class="blli time">{{$moment.utc(sublist.startdate).tz('Europe/Istanbul').format('HH:mm')}}</span>
                <span class="blli matches">{{ sublist.HomeTeam }} - {{ sublist.AwayTeam }}</span>
                <span class="mbslist">1</span>
              </div>
              <div class="odd-right-list-con">
                <div class="odd-right-list">
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, sublist.HomeTeam, sublist, 'Maç Bahsi')">{{ sublist.home | convertOdd($store.state.newrate) }}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, 'X', sublist, 'Maç Bahsi')">{{sublist.draw | convertOdd($store.state.newrate)}}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, sublist.AwayTeam, sublist, 'Maç Bahsi')">{{sublist.away | convertOdd($store.state.newrate)}}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, 'Alt 2.5', sublist, 'Toplam Gol Alt/Üst 2.5')">{{sublist.under | convertOdd($store.state.newrate)}}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, 'Üst 2.5', sublist, 'Toplam Gol Alt/Üst 2.5')">{{sublist.over | convertOdd($store.state.newrate)}}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, 'Var', sublist, 'Karşılıklı Gol')">{{sublist.yes | convertOdd($store.state.newrate)}}</div>
                  <div class="ottli rate-text" :data-id="sublist.id"  @click="addSlip($event, 'Yok', sublist, 'Karşılıklı Gol')">{{sublist.no | convertOdd($store.state.newrate)}}</div>
                </div> 
              </div>
            </div>
          </details>
        </div>
        <notfound v-if="notfound" :message="notfound" class="not-found" />
      </div>
    </div>
    <preloader v-if="isLoader" class="loader-con"/>
    <aside class="right-side">
      <slipside class="slip-side" :branchimage="branchimage"/>
      <div class="favorite-leags">
        <details class="left-details cp" v-for="(list, index) in favorites" :key="index">
          <summary class="title-3 fav-title" @click="getFav(list[0].RegionId)">
            <div class="left-title">
              <span class="flag-con">
                <img :src="getFlags(list[0].RegionName)" class="flags">
                <span class="leag">{{list[0].RegionName}}</span>
              </span>
            </div>
          </summary>
        </details>
      </div>
    </aside>
    <div v-if="isSubOptions" class="suboption-model">
      <div class="suboptions" >
        <header class="suboptions-header">
          <span class="soccer-left-header">
            <span class="option-close-left" @click="closeSub()">X</span>
            <span v-if="activeItem === 'all'" class="badge bg-m ml20">{{allOddsLength}}</span>
            <span v-else class="badge bg-m ml20">{{partOddsLength}}</span>
            <i class="fas fa-adjust navbar-icons cp" @click="isMarketOpen =! isMarketOpen" title="Aç Kapa"/>
          </span>
          <div>
            <h2>{{teamName}}</h2>
          </div>
          <span class="option-close-right" @click="closeSub()">X</span>
        </header>
        <div class="suboptions-con ">
          <ul class="nav nav-tabs nav-justified">
            <li class="nav-item">
              <a class="nav-link nll" @click.prevent="setActive('all')" :class="{ active: isActive('all') }" href="#all">Hepsi</a>
              <a class="nav-link nll" @click.prevent="setActive('fulltime'), getFullTime()" :class="{ active: isActive('fulltime') }" href="#fulltime">Maç Bahsi</a>
              <a class="nav-link nll" @click.prevent="setActive('goals'), getGoals()" :class="{ active: isActive('goals') }" href="#goals">Alt/Üst</a>
              <a class="nav-link nll" @click.prevent="setActive('firsthalf'), getFirstHalf()" :class="{ active: isActive('firsthalf') }" href="#firsthalf">İlk Yarı</a>
              <a class="nav-link nll" @click.prevent="setActive('secondhalf'), getSecondHalf()" :class="{ active: isActive('secondhalf') }" href="#secondhalf">İkinci Yarı</a>
              <a class="nav-link nll" @click.prevent="setActive('home'), getHome()" :class="{ active: isActive('home') }" href="#home">Ev</a>
              <a class="nav-link nll" @click.prevent="setActive('away'), getAway()" :class="{ active: isActive('away') }" href="#away">Dep</a>
              <i class="fas fa-adjust navbar-icons ml10 cp cl-w" @click="isMarketOpen = ! isMarketOpen" title="Aç Kapa"/>
            </li>
          </ul>
          <div class="tab-container-sub po-r">
            <div class="tab-pane po-r" :class="{ activeshow: isActive('all') }" id="all">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(suboddsSort1, 'templateId')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value,'', oddsname.name.value,'','')" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}">
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
              </div>
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(suboddsSort2, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value,'', oddsname.name.value,'','')">
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img src="~/static/img/loader2.gif" alt="" class="subloader" v-if="isSubloader">
                <span class="page-end" v-else>Başka veri yoktur!</span>
              </div>
            </div>
            <div class="tab-pane po-r" :class="{ activeshow: isActive('fulltime') }" id="fulltime">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(fullTime, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}">
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img  v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                <span v-else class="page-end">Başka veri yoktur!</span>
              </div>
            </div>
            <div class="tab-pane po-r" :class="{ activeshow: isActive('goals') }" id="goals">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(goals, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')">
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                <span v-else class="page-end">Başka veri yoktur!</span>
              </div>
            </div>
            <div class="tab-pane po-r" :class="{ activeshow: isActive('firsthalf') }" id="firsthalf">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(firstHalf, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')"> 
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                <span class="page-end" v-else>Başka veri yoktur!</span>
              </div>
            </div>
            <div id="secondhalf" class="tab-pane po-r" :class="{ activeshow: isActive('secondhalf') }">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(secondHalf, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                      || oddsname.templateId === 4721 
                      || oddsname.templateId === 26644 
                      || oddsname.templateId === 4733 
                      || oddsname.templateId === 19193 
                      || oddsname.templateId === 4734 
                      || oddsname.templateId === 4727 
                      || oddsname.templateId === 4726 
                      || oddsname.templateId === 4732 
                      || oddsname.templateId === 4718 
                      || oddsname.templateId === 17592}"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')"> 
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                <span v-else class="page-end">Başka veri yoktur!</span>
              </div>
            </div>
            <div class="tab-pane po-r" :class="{ activeshow: isActive('home') }" id="home">
              <div>
                <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(home, 'name.value')" :key="index">
                  <summary class="title-3 title-3-options mt2">
                    <div>
                      <header>
                        <i class="fas fa-shield-alt cl-g mr5"/>
                        <span>{{oddsname.name.value}}</span>
                      </header>
                    </div>
                  </summary>
                  <div class="subodds-list subodds-wrapperbwin">
                    <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                        || oddsname.templateId === 4721 
                        || oddsname.templateId === 26644 
                        || oddsname.templateId === 4733 
                        || oddsname.templateId === 19193 
                        || oddsname.templateId === 4734 
                        || oddsname.templateId === 4727 
                        || oddsname.templateId === 4726 
                        || oddsname.templateId === 4732 
                        || oddsname.templateId === 4718 
                        || oddsname.templateId === 17592}">
                      <div class="odds-rate-con">
                        <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                      </div>
                      <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                    </div>
                  </div>
                </details>
                <img  v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                <span v-else class="page-end">Başka veri yoktur!</span>
              </div>
            </div>
            <div class="tab-pane po-r" :class="{ activeshow: isActive('away') }" id="away">
                <div>
                  <details :open="isMarketOpen" v-for="(oddsname, index) in orderBy(away, 'name.value')" :key="index">
                    <summary class="title-3 title-3-options mt2">
                      <div>
                        <header>
                          <i class="fas fa-shield-alt cl-g mr5"/>
                          <span>{{oddsname.name.value}}</span>
                        </header>
                      </div>
                    </summary>
                    <div class="subodds-list subodds-wrapperbwin">
                      <div class="subodds-wrapper prebwinfixture" v-for="(oddsvalue, index) in oddsname.results" :key="index" 
                      :class="{liveClass4:oddsname.templateId === 4720 
                      || oddsname.templateId === 4721 
                      || oddsname.templateId === 26644 
                      || oddsname.templateId === 4733 
                      || oddsname.templateId === 19193 
                      || oddsname.templateId === 4734 
                      || oddsname.templateId === 4727 
                      || oddsname.templateId === 4726 
                      || oddsname.templateId === 4732 
                      || oddsname.templateId === 4718 
                      || oddsname.templateId === 17592}"
                      @click="addSlip(oddsvalue.odds, oddsvalue.name.value, '', oddsname.name.value,'','')"> 
                        <div class="odds-rate-con">
                          <span class="oddsrate mr5">{{oddsvalue.name.value}}</span>
                        </div>
                        <span class="oddsrate ml5 cl-r">{{oddsvalue.odds | convertOdd($store.state.newrate)}}</span>
                      </div>
                    </div>
                  </details>
                  <img v-if="isSubloader" src="~/static/img/loader2.gif" alt="" class="subloader">
                  <span v-else class="page-end">Başka veri yoktur!</span>
                </div>
            </div>
          </div>
        </div>
        <footer class="suboptions-footer"></footer>
      </div> 
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
import Vue2Filters from 'vue2-filters'
import marketsjson from '~/assets/markets/soccermarkets.json'
import {apimixin} from '../../mixins/api'
export default {
  mixins: [Vue2Filters.mixin, apimixin('x')],
  name: 'Soccer',
  data () {
    return {
      markets: marketsjson,
      leagues: {},
      subOdds: {},
      suboddsSort1:{},
      suboddsSort2:{},
      favorites: {},
      leaguesLength: 0,
      searchBox: null,
      timeBox: 'Saat',
      dateBox: 'Hepsi',
      isSubOptions: false,
      notfound: null,
      isLoader: false,
      isSubloader: true,
      betSlip:false,
      branchimage: 'futbol',
      teamName:null,
      code:null,
      isLeagueOpen:true,
      isMarketOpen:true,
      slips: {},
      intervalLeagueList:null,
      lid:0,
      mid:0,
      activeItem: 'all',
      fullTime:[],
      firstHalf:[],
      secondHalf:[],
      home:[],
      away:[],
      goals:[],
      partOddsLength:0,
      allOddsLength:0,
      subTime:0
    }
  },
  mounted () {
    if (!localStorage.getItem("set")) {
        this.getLeaguesFunction()
    }
    if (localStorage.getItem("set") && JSON.parse(localStorage.getItem("set")).find(item => item.filterid == 1)) {
      this.notfound = 'No Data'
    } else {
      this.getLeaguesFunction()
    }
  },
  filters:{
    convertOdd (value, store) {
      if (store) {
        const item = store.find(item => item.type === 'sor')
        if (item && value !== undefined && value !== '') {
          return (value - item.rate).toFixed(2)
        } else {
          return value
        }
      } else {
        return value
      }
    }
  },
  computed:{
    getRateToggle () {
      if(this.$store.state.ratetoggle){
        document.querySelectorAll('.rate-text').forEach(item => {
          item.classList.remove('bg-g')
        })
      }
    }
  },
  methods: {
    async getLeagues () {
      this.isLoader = true
      await axios.get('/api/home/soccerfixture').then((result)=>{
        if (result.data.length > 0) {
          // const final = result.data.filter(item => moment(item.startdate).tz('Europe/Istanbul').format('YYYY MM DD HH:mm') > moment().format('YYYY MM DD HH:mm'))
          const final = result.data
          this.leagues =  this.setGroup(final, 'leagueid')
          this.search = final
          this.leaguesLength = final.length
          this.isLoader = false
          const favtemp = final.filter(item => item.RegionId === 31
            || item.RegionId === 37 
            || item.RegionId === 14 
            || item.RegionId === 36 
            || item.RegionId === 17 
            || item.RegionId === 16 
            || item.RegionId === 20 
            || item.RegionId === 28)
          this.favorites = this.setGroup(favtemp, 'RegionId')
          const fixtureid = final.map(item => item.fixtureid)
          this.$store.commit('setFixtureId', fixtureid)
        }
        this.isLoader = false
      })
    },
    async getOdds (id) {
      this.isSubloader = true
      this.subOdds = {}
      this.teamName = null
      this.allOddsLength = null
      this.isSubOptions = true
      let mid = 0
      this.setActive ('all')
      await axios.get(`/api/home/soccerfixtureodds/${id}`).then((result)=>{
        if (result.data.status != 0 && result.data.length > 0) {
          this.teamName = result.data[0].HomeTeam +' - '+ result.data[0].AwayTeam
          this.code = id
          this.subTime = result.data[0].Date
          if (localStorage.getItem('set')) {
            let ls = JSON.parse(localStorage.getItem('set'))
            mid = ls.map(item => {
              if (item && item.type === 'som') {
                return {filterid:item.filterid}
              } else {
                return 0
              }
            })
            this.subOdds = result.data[0].Markets.filter(item1 => { return mid.some(item2 => (item2.filterid === item1.templateId))})
          } else {
            this.subOdds = result.data[0].Markets
          }
          this.subOdds.forEach(item => {
            this.markets.forEach(item2 => {
              if (item.templateId === item2.id || item.id === item2.id) {
                item.name.value = item2.name
              }
            })
          })
          this.transOdds(this.subOdds)
          this.allOddsLength = this.subOdds.length
          this.suboddsSort1 = this.subOdds.filter(item => item.templateId === 17 
            || item.templateId === 21 
            || item.templateId === 2488 
            || item.templateId === 3187 
            || item.templateId === 24392 
            || item.templateId === 20589 
            || item.templateId === 20592)
          this.suboddsSort2 = this.subOdds.filter(item => item.templateId !== 17 
            && item.templateId !== 21 
            && item.templateId !== 2488 
            && item.templateId !== 3187 
            && item.templateId !== 24392 
            && item.templateId !== 20589 
            && item.templateId !== 20592)
          this.isSubloader = false
        }else {
          this.isSubloader = false
        }
      })
    },
    getFav (id) {
      const test = this.search.filter(item => item.RegionId === id)
      this.leagues = this.setGroup(test, 'leagueid')
      this.leaguesLength = test.length
      window.scrollTo(0, 534);
    },
    resetFav () {
      this.leagues = this.setGroup(this.search, 'leagueid')
      this.leaguesLength = this.search.length
    },
    closeSub () {
      this.isSubOptions = false
      this.loader = false
    },
    filterAsDate () {
      if (this.dateBox === 'all') {
        this.leaguesLength = this.search.length
        this.timeBox = 'all'
        this.leagues = this.setGroup(this.search, 'leagueid')
      } else {
        const temp = this.search.filter(item => moment(item.startdate).format('YYYY-MM-DD') === this.dateBox)
        this.leagues = this.setGroup(temp, 'leagueid')
        this.leaguesLength = temp.length
      }
    },
    filterAsTime () {
      if (this.timeBox === 'all') {
        this.leaguesLength = this.search.length
        this.timeBox = 'all'
        this.leagues = this.search.reduce(function (acc, obj) {
            let key = obj['leagueid'];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
      } else {
        const temp = this.search.filter(item => moment(item.startdate).format('YYYY-MM-DD HH:mm').toString() >  moment().format('YYYY-MM-DD HH:mm') && moment(item.startdate).format('YYYY-MM-DD HH:mm').toString() < this.timeBox)
        this.leagues = temp.reduce(function (acc, obj) {
            let key = obj['leagueid'];
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        this.leaguesLength = temp.length
      }
    },
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    searchFilter () {
      const searchArray = this.search.filter(item => item.HomeTeam.toLowerCase().includes(this.searchBox.toLowerCase()) || item.AwayTeam.toLowerCase().includes(this.searchBox.toLowerCase()) || item.fixtureid.toString().slice(-3).startsWith(this.searchBox))
      this.leagues = this.setGroup(searchArray, 'leagueid')
      this.leaguesLength = searchArray.length
    },
    getFullTime () {
      if(this.subOdds.length > 0){
        this.fullTime = []
        this.fullTime = this.subOdds.filter(item => item.templateId === 17
          || item.templateId === 3187
          || item.templateId === 24392
          || item.templateId === 4665
          || item.templateId === 19193
          || item.templateId === 20590
          || item.templateId === 7824
          || item.templateId === 19508
          || item.templateId === 19509
          || item.templateId === 19510
          || item.templateId === 19511
          || item.templateId === 19512
        )
        this.partOddsLength = this.fullTime.length
      }
    },
    getFirstHalf () {
      if(this.subOdds.length > 0){
        this.firstHalf = []
        this.firstHalf = this.subOdds.filter(item => item.name.value.includes('İlk Yarı'))
        this.partOddsLength = this.firstHalf.length
      }
    },
    getSecondHalf () {
      if(this.subOdds.length > 0){
        this.secondHalf = []
        this.secondHalf = this.subOdds.filter(item => item.name.value.includes('İkinci Yarı'))
        this.partOddsLength = this.secondHalf.length
      }
    },
    getHome () {
      if(this.subOdds.length > 0){
        this.home = []
        this.home = this.subOdds.filter(item => item.name.value.includes('Evsahibi'))
        this.partOddsLength = this.home.length
      }
    },
    getAway () {
      if(this.subOdds.length > 0){
        this.away = []
        this.away = this.subOdds.filter(item => item.name.value.includes('Deplasman'))
        this.partOddsLength = this.away.length
      }
    },
    getGoals () {
      if(this.subOdds.length > 0){
        this.goals = []
        this.goals = this.subOdds.filter(item => item.name.value.includes('Toplam Gol Alt/Üst'))
        this.partOddsLength = this.goals.length
      }
    },
    addSlip (...args) {
      const rateclass = event.target.className
      const parent = event.target.parentElement
      event.target.classList.toggle('bg-g')
      parent.querySelectorAll('.bg-g').forEach(item => {
        item.classList.remove('bg-g')
        event.target.classList.add('bg-g')
      })
      this.$store.commit('setRateToggle', false)
      this.selectedId = true
      let hc = ''
      let to = ''
      let code = ''
      let match = ''
      if (args[2] === '') {
        code = this.code
      } else {
        code = args[2].fixtureid
      }
      if (args[2] === '') {
        match = this.teamName
      } else {
        match = args[2].HomeTeam +' - '+ args[2].AwayTeam
      }
      if(args[4] !== null && args[4] !== undefined){
        hc = args[4]
      }
      if(args[5] !== null && args[5] !== undefined){
        to = args[5]
      }
      let st = ''
      if (args[2]) {
        st = moment(args[2].startdate).tz('Europe/Istanbul').format('YYYY-MM-DD HH:mm')
      } else {
        st = moment(this.subTime).tz('Europe/Istanbul').format('YYYY-MM-DD HH:mm')
      }
      const betdate = st.substring(5,5)
      const bettime = st.slice(-5)
      setTimeout(() => {
        if (args[0] !== '-') {
          this.slips = {
            code: String(code).slice(-3),
            user: this.$store.state.auth.user,
            admin: this.$store.state.auth.admin,
            superadmin: this.$store.state.auth.superadmin,
            matches: match,
            games: args[3],
            options: args[1] +''+ hc +''+ to,
            rate: args[0].target.innerText,
            stream: 'Bülten',
            state: 'Aktif',
            eventtime:betdate +'/'+ bettime,
            scoreid: code,
            selected: args[2].id
          }
          if (!this.$store.state.betslip){
            this.$store.commit('setBetSlip', true)
          }
          setTimeout(() => {
            let t = 0
            if (this.$store.state.slips.length > 0) {
              const test = this.$store.state.slips.find((item,index) =>{
                t = index
                return item.code === String(code).slice(-3)
              })
              if (test === undefined) {
                this.$store.commit('setSlips', this.slips)
              } else {
                if (rateclass === 'ottli rate-text bg-g') {
                  this.$store.commit('removeSlipItem', t)
                  if (this.$store.state.slips < 1) {
                    this.$store.commit('setBetSlip', false)
                  }
                } else {
                  this.$store.commit('removeSlipItem', t)
                  setTimeout(() => {
                    this.$store.commit('setSlips', this.slips)
                  }, 10)
                }
              }
            } else {
              this.$store.commit('setSlips', this.slips)
            }
          }, 20)
        }
      }, 30)
    },
    getLeaguesFunction(){
      this.getLeagues()
      this.intervalLeagueList = setInterval(() => {
        this.getLeagues()
      }, 905 * 1000)
    }
  },
  beforeDestroy: function() {
    clearInterval(this.intervalLeagueList)
  }
}
</script>
