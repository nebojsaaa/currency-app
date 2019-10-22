<template>
	<div id="app">
		<Header />
		<div class="row">
			<div class="search col-md-4 col-sm-12">
				<input type="text" name="search-cur" class="search__input" id="search-cur" v-model="searchTerm" placeholder="Seach...">
			</div>
		</div>
		<div class="main row">
			<div class="sidebar-wrap col-md-4 col-sm-12">
				<CurrencyList 
					v-bind:currency="(filteredCurrnecy || currency)"
					v-on:del-currency="deleteCurrency"
					v-on:edit-currency="editCurrency"
				/>
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
import config from './config';
import Header from './components/Header.vue';
import CurrencyList from './components/CurrencyList.vue';

export default {
	components: {
		Header,
		CurrencyList
	},

	data() {
		return {
			currency: config.getCurrencies || [],
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
	}
}
</script>
  
<style lang="sass">
	@import './style/main.scss'
</style>
