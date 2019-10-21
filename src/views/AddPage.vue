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

<template>
    <div>
		<AddCurrency v-on:add-currency="newCurrencyObject" />
    </div>
</template>

<style lang="sass" scoped>

</style>