<template>
    <div>
        <h3>Add Currency</h3>
        <form @submit.prevent="addCurrency">
            <label>Currency code<input type="text" required name="currencyCode" v-model="currencyCode"></label>
            <span>{{this.errors.codeExist.message}}</span>
            <label>Currency symbol<input type="text" required name="currencySymbol" v-model="currencySymbol"></label>
            <span>{{this.errors.symbolExist.message}}</span>
            <input type="submit" value="Sumbit">
        </form>
    </div>
</template>

<script>
import uuid from 'uuid';

export default {
    name: "AddCurrency",
    data() {
        return {
            currencyCode: '',
            currencySymbol: '',
            errors: {
                codeExist: {
                    status: false,
                    message: ''
                },
                symbolExist: {
                    status: false,
                    message: ''
                }
            }
        }
    },

    methods: {
        addCurrency() {
            this.formValidation();
            if (this.errors.codeExist.status || this.errors.symbolExist.status) return;

            const newObj = {
                 id: uuid.v4(),
                 currencyCode: this.currencyCode,
                 currencySymbol: this.currencySymbol
            };

            // Send up to parent
            this.$emit('add-currency', newObj);
            // Reset values
            this.currencyCode = '';
            this.currencySymbol = '';
        },

        formValidation() {
            const currencies = this.getCurrencies();

            Object.values(currencies).forEach((currency) => {
                console.log(this.currencyCode.toLowerCase() === currency.currencyCode.toLowerCase());
                if (this.currencyCode.toLowerCase() === currency.currencyCode.toLowerCase()) {
                    this.errors.codeExist.status = true;
                    this.errors.codeExist.message = 'Code already exist.';
                    continue;
                } else if (this.currencyCode.length !== 3) {
                    this.errors.codeExist.status = true;
                    this.errors.codeExist.message = 'Code must 3 characters long.';
                    continue;
                } else {
                    this.errors.codeExist.status = false;
                    this.errors.codeExist.message = '';
                }

                if (this.currencySymbol.toLowerCase() === currency.currencySymbol.toLowerCase()) {
                    this.errors.symbolExist.status = true;
                    this.errors.symbolExist.message = 'Symbol already exist.';
                    continue;
                } else {
                    this.errors.symbolExist.status = false;
                    this.errors.symbolExist.message = '';
                }
            });
        },

        getCurrencies() {
            return JSON.parse(localStorage.getItem('currencies')) || [];
        }
    }
}
</script>

  
<style lang="scss" scoped>

</style> 
