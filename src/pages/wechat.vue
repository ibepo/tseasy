<script setup lang="ts">

import { useRequest } from 'vue-request' // 导入插件
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const phonenum = ref('15176526258')
const url = 'http://interface.chinatsi.net/api_v1/wechatapi/customer'
const url2 = 'http://tsgtapp.chinatsi.cn/tenxAdmin/menu/findUser'
const yanqi_yewuyuan = ref('')

const getList = () => {
  return axios.get(url,
    {
      params: {
        pagenum: '1',
        pernum: '10',
        telephone: phonenum.value,
        force_flag: 'A',
        single: 'A',
      },
    })
}
const getList2 = () => {
  return axios.get(url2,
    {
      params: {
        page: 1,
        pageSize: 1,
        jsonStr: JSON.stringify({
          startTime: '',
          endTime: '',
          registStartTime: '',
          registEndTime: '',
          receiveStartTime: '',
          receiveEndTime: '',
          deptId: '',
          userId: '',
          tel: phonenum.value,
          company: '',
          proId: '',
          cityId: '',
          ReceivedUser: '1',
          modeuleId: '',
          moduleState: '',
          loginState: '',
          origin: '',
          tagId: '',
        }),
      },
    })
}
const app_yanqi = (item: any, days: number) => {
  return axios.put(`${url}/${phonenum.value}`, {
    data: {
      customer_name: item.customer_name,
      user_id: item.customerid,
      end_time: yanqi_data.value,
      customer_group: data3.value.customer_group,
      opertion_id: item.customerid,
    },
  })
}
const { data: userlist } = useRequest('http://interface.chinatsi.net/api_v1/wechatapi/select_user')
const { run, data: weixindata } = useRequest(getList, {
  manual: true,
})

const pick_date2 = ref('')
const current_end_date = computed(() => dayjs(weixindata.value.data.data[0].end_time).format('YYYY-MM-DD'))

const { run: run3, data: data3 } = useRequest(`${url}/${phonenum.value}`, { manual: true })

const { run: run2, data: data2 } = useRequest(getList2, { manual: true })

const useroptions = computed(() => {
  return userlist.value.map((item) => {
    return {
      lable: item.user_id,
      value: item.user_name,
    }
  })
})
const go = () => {
  run()
  run3()
  run2()
}

const shortcuts = [
  {
    label: '7天后',
    value: () => dayjs(current_end_date.value).add(7, 'day'),
  },
  {
    label: '15天后',
    value: () => dayjs(current_end_date.value).add(15, 'day'),
  },
  {
    label: '一个月后',
    value: () => dayjs(current_end_date.value).add(1, 'month'),
  },
]

const el = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
useTitle().value = '大饼卷一切'
useFavicon().value = 'cookie.svg'
</script>

<template>
  <div ref="el" p="x-4 y-2" border="~ gray-400 rounded" shadow="~ hover:lg"
    class="fixed bg-$vt-c-bg select-none cursor-wait z-10" style="touch-action:none;" :style="style">
    👋 Drag me!
    <div class="text-sm opacity-50">
      I am at {{ Math.round(x) }}, {{ Math.round(y) }}
    </div>
  </div>
  <div>
    <div m-b-8 p-8 m-auto>
      <a-input-search v-model="phonenum" :style="{ width: '360px' }" placeholder="输入手机号" button-text="搜索" search-button
        @press-enter="go()" @search="go" />
    </div>

    <div flex p-4>
      <a-space v-if="weixindata" size="large" direction="vertical" fill shadow-xl p-4 text-left>
        <p text-2xl>
          微信企业号
        </p>
        <p>
          #：{{ weixindata.data.data[0].customerid }}
        </p>
        <p>
          手机号码：{{ weixindata.data.data[0].telephone }}
        </p>
        <p>
          客户名称：{{ weixindata.data.data[0].customer_name }}
        </p>
        <p>
          开始时间：{{ weixindata.data.data[0].begin_time }}
        </p>
        <p>
          结束时间：{{ dayjs(weixindata.data.data[0].end_time).format('YYYY-MM-DD') }}
        </p>

        <p>
          标签：{{ weixindata.data.data[0].labelname }}
        </p>
        <p>
          延期年数：{{ weixindata.data.data[0].yeardelaynum }}
        </p>
        <s-space>
          延期时间：
          <a-date-picker v-model="pick_date2" w-220px shortcuts-position="right" position="bl" :shortcuts="shortcuts" />
        </s-space>
        <a-space>
          业务人员：
          <a-auto-complete :data="useroptions" :style="{ width: '220px' }"
            :placeholder="weixindata.data.data[0].user_name" />
        </a-space>
        <a-button m-t-2 type="primary" long @click="app_yanqi(weixindata.data.data[0], 15)">
          延期到 {{ pick_date2 }}
        </a-button>
      </a-space>

      <div v-if="data2" shadow-xl>
        <a-space size="large" direction="vertical" fill text-left p-4>
          <p text-2xl>
            唐宋App
          </p>
          <p>
            #：{{ data2.data.data[0].id }}
          </p>
          <p>
            手 机 号：{{ data2.data.data[0].tel }}
          </p>
          <p>
            客 户 名: {{ data2.data.data[0].zy }}
          </p>
          <p>
            业 务 员：{{ data2.data.data[0].adminName }}
          </p>
          <p>
            最近操作：{{ data2.data.data[0].sdate }}
          </p>
          <div>
            <p v-for="(item, index) in data2.data.data[0].modulesInfo" :key="index" text-left m-t-2>
              <br>
              {{ item.MODULES_NAME }}
              <br>
              [
              {{ dayjs(item.STARTTIME).format('YYYY-MM-DD') }} ~ {{ dayjs(item.ENDTIME).format('YYYY-MM-DD') }}
              ]
            </p>
          </div>
        </a-space>
      </div>
    </div>
  </div>
</template>
