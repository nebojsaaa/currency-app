<template>
    <aside class="sidebar">
        <h3 class="sidebar__title">Currency List</h3>
        <div class="sidebar__list-wrap" v-bind:key="currencyItem.id" v-for="currencyItem in currency">
            <CurrencyItem 
                v-bind:currencyItem="currencyItem" 
                v-on:del-currency="$emit('del-currency', currencyItem.id)" 
                v-on:edit-currency="$emit('edit-currency', currencyItem)"
            />
        </div>
         <router-link class="sidebar__btn" to="/add" tag="button">Add currency</router-link>
    </aside>
</template>

<script>
import CurrencyItem from './CurrencyItem.vue';

export default {
    name: "Currency",
    components: {
        CurrencyItem
    },
    props: ["currency"]
}
</script>

  
<style lang="scss" scoped>

</style> 
