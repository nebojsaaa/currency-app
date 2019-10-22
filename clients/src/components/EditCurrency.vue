<template>
    <div class="form-wrap">
        <h3 class="form__title">Edit Currency</h3>
        <form class="form" @submit.prevent="saveEditedCurrency">
            <div class="form__input-wrap">
                <span class="form__label">Currency code</span>
                <div class="form__input-wrap-field">
                    <input class="form__input" v-bind:class="{'form__input--error':this.errors.codeExist.status}" type="text" required name="currencyCode" v-model="currencyCode" />
                    <span class="form__input-error-msg">{{this.errors.codeExist.message}}</span>
                </div>
            </div>
             <div class="form__input-wrap">
                <span class="form__label">Currency symbol</span>
                <div class="form__input-wrap-field">
                    <input class="form__input" v-bind:class="{'form__input--error':this.errors.symbolExist.status}" type="text" required name="currencySymbol" v-model="currencySymbol" />
                    <span class="form__input-error-msg">{{this.errors.symbolExist.message}}</span>
                </div>
             </div>
            <input type="submit" value="Sumbit" class="form__submit-btn">
        </form>
    </div>
</template>

<script>
import config from '../config';

export default {
    name: "EditCurrency",
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
    props: ["editCurrencyObj"],

    watch: {
        editCurrencyObj: function(newVal) {
             // reset values
            this.resetValues();
            this.updateState(newVal);
        }
    },

    methods: {
        saveEditedCurrency() {
             // reset values
            this.resetValues();
            this.formValidation();
            if (this.errors.codeExist.status || this.errors.symbolExist.status) return;

            const newObj = {
                id: this.editCurrencyObj.id,
                currencyCode: this.currencyCode,
                currencySymbol: this.currencySymbol
            };
            // Send up to parent
            this.$emit('save-edited-currency', newObj);
            
            // Reset values
            this.currencyCode = '';
            this.currencySymbol = '';
        },

        formValidation() {
            const currencies = config.getCurrencies;
            Object.values(currencies).forEach((currency) => {
                if (this.currencyCode.toLowerCase() === currency.currencyCode.toLowerCase()) {
                    this.errors.codeExist.status = true;
                    this.errors.codeExist.message = 'Code already exist.';
                }

                if (this.currencyCode.length !== 3) {
                    this.errors.codeExist.status = true;
                    this.errors.codeExist.message = 'Must be 3 character long';
                }

                if (this.currencySymbol.toLowerCase() === currency.currencySymbol.toLowerCase()) {
                    this.errors.symbolExist.status = true;
                    this.errors.symbolExist.message = 'Symbol already exist.';
                } 
            });
        },

        updateState(obj) {
            this.currencyCode = obj.currencyCode;
            this.currencySymbol = obj.currencySymbol;
        },

        resetValues() {
            this.errors.codeExist.status = false;
            this.errors.symbolExist.status = false;
            this.errors.codeExist.message = '';
            this.errors.symbolExist.message = '';
        }
    },

    created() {
        this.updateState(this.editCurrencyObj);
    }
}
</script>

  
<style lang="scss" scoped>

</style> 
