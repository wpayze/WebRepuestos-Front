<template>
<section>
    <div class="container padding">
        
    </div>
</section>
    
</template>

<script>
export default {
    data: function(){
        return {
            user: {}
        }
    },
    beforeMount(){
        if (localStorage.getItem('user')){
            this.user = JSON.parse(localStorage.getItem('user'));
        }else{
            this.user = "";
        }
    }
}
</script>

<style scoped>
    .profile{
        background: #2880e3;
    }
</style>
