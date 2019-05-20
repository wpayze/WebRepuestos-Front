<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <h1>{{user.first_name}} {{user.last_name}}</h1>
            </div>
            <div class="column">
                <h1>hola</h1>
            </div>
        </div>
    </div>
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
    html{
        background:#f2f2f2;
    }
    .columns{
        margin: 0;
    }
    .column{
        background: #5BC0DE;
        border-radius: 1em;
        padding: 1em;
        margin:2em;
    }
</style>
