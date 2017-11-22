<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closeModal">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
                <slot name="btnGroup"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" @click="closeModal" v-show="mdShow"></div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        props:['mdShow'],//子组件不能改变该变量的值
        methods: {
          closeModal () {
            this.$emit('close');//调用父组件的close事件对应的方法，父组件: v-on:close='closeModal'
          }
        }
    }
</script>
