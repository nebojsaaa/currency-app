<template>
	<div id="app">
		<Header />
		<div class="row">
			<div class="col-md-4">
				<div class="search">
					<input type="text" name="search-cur" id="search-cur" v-model="searchTerm" placeholder="Serach...">
				</div>
				<CurrencyList v-bind:currency="(filteredCurrnecy || currency)" v-on:del-currency="deleteCurrency" v-on:edit-currency="editCurrency" />
			</div>
			<div class="col-md-8">
				<router-view
					v-on:add-currency="addCurrency"
					v-bind:editCurrencyObj="editCurrencyObj"
					v-on:save-edited-currency="saveEditedCurrency"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from './components/Header.vue';
import CurrencyList from './components/CurrencyList.vue';

export default {
	components: {
		Header,
		CurrencyList
	},

	data() {
		return {
			currency: JSON.parse(localStorage.getItem('currencies')) || [],
			filteredCurrnecy: null,
			editCurrencyObj: {},
			searchTerm: ''
		}
	},

	watch: {
		searchTerm: function(newVal) {
			const foundCurrencies = this.currency.filter(obj => obj.currencyCode.toLowerCase().startsWith(newVal.toLowerCase()) || obj.currencySymbol.toLowerCase().startsWith(newVal.toLowerCase()));
			this.filteredCurrnecy = foundCurrencies;
		}
	},

	methods: {
		addCurrency(newObj) {
			if (Object.keys(newObj).length === 0) return 'Your object is empty';

			this.currency = [...this.currency, newObj];
			localStorage.setItem('currencies', JSON.stringify(this.currency));
		},

		deleteCurrency(id) {
			const newArrayOfCurrencies = this.currency.filter(item => item.id !== id);
			this.currency = newArrayOfCurrencies;
			localStorage.setItem('currencies', JSON.stringify(this.currency));
		},

		editCurrency(obj) {
			this.editCurrencyObj = obj;
		},

		saveEditedCurrency(newObj) {
			const updateCurrencies = this.currency.map(obj => {
				if (obj.id === newObj.id) return newObj;
				return obj;
			});

			this.currency = updateCurrencies;
			localStorage.setItem('currencies', JSON.stringify(this.currency));
		}
	},

	computed: {

	}
}
</script>
  
<style lang="sass">
	@import './style/main.scss'
</style>
