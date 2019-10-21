<template>
    <div>
        <h3>Edit Currency</h3>
        <form @submit.prevent="saveEditedCurrency">
            <label>Currency code<input type="text" required name="currencyCode" v-model="currencyCode"></label>
            <label>Currency symbol<input type="text" required name="currencySymbol" v-model="currencySymbol"></label>
            <input type="submit" value="Sumbit">
        </form>
    </div>
</template>

<script>

export default {
    name: "EditCurrency",
    data() {
        return {
            currencyCode: '',
            currencySymbol: ''
        }
    },
    props: ["editCurrencyObj"],

    watch: {
        editCurrencyObj: function(newVal) {
            this.updateState(newVal);
        }
    },

    methods: {
        saveEditedCurrency() {
            const newObj = {
                id: this.editCurrencyObj.id,
                currencyCode: this.currencyCode,
                currencySymbol: this.currencySymbol
            };
            // Send up to parent
            this.$emit('save-edited-currency', newObj);
        },

        updateState(obj) {
            this.currencyCode = obj.currencyCode;
            this.currencySymbol = obj.currencySymbol;
        }
    },

    created() {
        this.updateState(this.editCurrencyObj);
    }
}
</script>

  
<style lang="scss" scoped>

</style> 
