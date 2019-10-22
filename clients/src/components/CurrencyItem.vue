<template>
	<div class="sidebar__list">
		<router-link  to="/edit" tag="button">
			<span class="sidebar__list-item" @click="$emit('edit-currency', currencyItem)">{{currencyItem.currencyCode}}</span>
		</router-link>
		<button class="sidebar__list-delete" @click="$emit('del-currency', currencyItem.id)">Delete</button>
	</div>
</template>

<script>

export default {
    name: "CurrencyItem",
    props: ["currencyItem"]   
}
</script>

  
<style lang="scss" scoped>

</style> 
