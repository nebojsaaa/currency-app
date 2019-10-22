<template>
	<AddCurrency v-on:add-currency="newCurrencyObject" />
</template>

<script>
import AddCurrency from '../components/AddCurrency';

export default {
    name: "AddPage",
    components: {
        AddCurrency
    },

    methods: {
        newCurrencyObject(data) {
            this.$emit('add-currency', data);
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
