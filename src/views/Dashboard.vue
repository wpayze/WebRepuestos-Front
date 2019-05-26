<template>
    <div id="app">
        <h1>Bienvenido {{user.first_name}} {{user.last_name}}</h1>
        
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            user: {}
        }
    },
    mounted: function(){
        this.user = JSON.parse(localStorage.getItem('user'));
    }
}
</script>
