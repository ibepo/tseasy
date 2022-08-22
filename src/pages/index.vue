
<script setup lang="ts">
import { useRequest } from 'vue-request'
import { useNow } from '@vueuse/core'
// import { bot } from './bot/run'

const { now } = useNow({ controls: true })
const wechatPath = $ref('C:/Program Files (x86)/Tencent/WeChat/WeChat.exe')
const { data } = useRequest('http://114.113.152.67:8118/API_V1/API_MSGBYMSSQL/MSG_INFO?keyword&sdate&edate=2022/04/02&pz&pagenum=1&pernum=5', {
  pollingInterval: 1000 * 60 * 5,
  pollingWhenHidden: true,
})

const go = () => {
  // bot()
}

</script>

<template>
  <div>
    <div i-carbon-edge-device text-4xl inline-block />
    <p text-3l />
    {{ now.toLocaleDateString() }}
    <div py-2 />
    <input
      id="input"
      v-model="wechatPath"
      type="text"
      p="x-4 y-2"
      w="450px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <div py-2 />
    <div>
      <div inline bg-red-400 m-1 p-1 text-white-200>
        {{ data.data[0].pz }}
      </div>
      <div inline bg-red-400 m-1 p-1 text-white-200>
        {{ data.data[0].sdate }}
      </div>
    </div>

    <div py-2 />
    <div>
      <div box text-black>
        {{ data.data[0].info }}
      </div>
    </div>

    <div>
      <button
        class="m-5 text-3l bg-green-600 btn"
        :disabled="!wechatPath"
        @click="go"
      >
        自动转播
      </button>
    </div>
  </div>
</template>
