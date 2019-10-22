<script>
import EditCurrency from '../components/EditCurrency';

export default {
    name: "EditPage",
    components: {
        EditCurrency
    },
    props: ["editCurrencyObj"],
    methods: {
        newEditedCurrencyObject(data) {
            this.$emit('save-edited-currency', data);
        }
    }
}
</script>

<template>
    <div>
        <EditCurrency v-bind:editCurrencyObj="editCurrencyObj" v-on:save-edited-currency="newEditedCurrencyObject"/>
    </div>
</template>

<style lang="sass" scoped>

</style>