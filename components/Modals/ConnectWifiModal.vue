<template>
  <b-modal
      modal-class="my-modal-class"
      id="wifi_conn"
      title="WIFI SETTING"
      @ok="connectToWifi"
    >
      <p class="modal-ttl">Please select wifi from list</p>
      <p class="modal-desc">
        เลือกเครือข่าย wi-fi เพื่อเชื่อต่ออินเทอร์เน็ต สำหรับ KidBright AI<br />หมายเหตุ
        : แนะนำให้เลือกเครือข่ายเดียวกันกับคอมพิวเตอร์
      </p>
      <b-dropdown
        id="ddCommodity"
        name="ddCommodity"
        :text="selected_ssid ? selected_ssid : 'Select Wi-Fi'"
        v-model="selected_ssid"
        variant="secondary"
        class="mb-2"
        menu-class="w-100"
        block
      >
        <b-dropdown-item
          v-for="option in ap_names"
          :key="option.value"
          :value="option.value"
          @click="selected_ssid = option.value"
        >
          {{ option.text }}
        </b-dropdown-item>
      </b-dropdown>

      <b-form-input
        v-model="wifi_password"
        placeholder="กรุณาใส่รหัสผ่าน"
      ></b-form-input>
    </b-modal>
</template>