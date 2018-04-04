<template>
    <div id="index">
        <canvas id="video-canvas"></canvas>
        <input ref="input"/>
        <button @click="playerVideo">播放</button>

    </div>
</template>

<script>
    import router from 'vue-router'
    export default {
        name:'index',
        data(){
            return {
                msg:"我可以等在你身旁",
                url:"wss://wsopen.ys7.com/150373158_1_1",
                player:''
            }
        },
        methods:{
            teb:function () {
                this.msg = "像影子追着光梦游。";
            },
            startEvent:function (url) {
                var canvas = document.getElementById('video-canvas');
                if(this.player!=''){
                    this.player.destroy();
                }
                this.player = new JSMpeg.Player(url, {canvas: canvas});
            },
            playerVideo: function () {
                this.url = this.$refs.input.value;
                this.startEvent(this.url)
            },
        },
        mounted:function () {
            console.log("哇娃",router);
            this.startEvent(this.url);
        }
    }

</script>

<style lang="stylus" rel="stylesheet">
   #index
       font-size : 16px;
       text-align : center;
       color : red;
       canvas
          width 100%;
          height 60%;
       button
          margin 0 auto;
       input
          display block;
          height 0.3rem;
          width 3rem;
          border 1px solid yellow;
          margin 0.1rem auto;
</style>