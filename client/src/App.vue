<template>
	<div id="app">
		<div class="mb-3">
			<label for="secret" class="form-label">Message:</label>
			<textarea required v-model="description" class="form-control" id="secret" rows="3"></textarea>
		</div>
		<div class="mb-3 row">
			<label for="views" class="col-sm-2 col-form-label">Views:</label>
			<div class="col-sm-2">
				<input required type="number" v-model="views" class="form-control" id="views">
			</div>
			<label for="ttl" class="col-sm-2 col-form-label">Time to live:</label>
			<div class="col-sm-2">
				<input required type="number" v-model="ttl" class="form-control" id="ttl">
			</div>
		</div>
		<div class="mb-3">
			<button type="button" class="btn btn-primary" @click="addSecret">Send</button>
		</div>

		<hr>

		<div class="input-group mb-3">
            <input type="text" class="form-control" v-model="hash" placeholder="Hash" aria-label="Hash" aria-describedby="button-addon2">
            <button class="btn btn-primary" type="button" id="button-addon2" @click="searchSecret" :disabled="!hash">
				Search
			</button>
        </div>
		<div class="alert alert-primary" v-if="secret" role="alert">
			<span class="badge bg-secondary"></span>
			Message: {{ secret.secretText }}
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: 'App',
	data() {
		return {
			secret: {},
			description: "",
			views: "",
			ttl: "",
			hash: ""
		};
	},
	methods: {
		
		async addSecret() {
			if(!this.description || !this.views || this.views <= 0 || !this.ttl || this.ttl < 0) {
				alert("Please fill the form");
				return false
			}
			await axios.post('api/secret/', { 
				secretText: this.description, 
				remainingViews: this.views,
				ttl: this.ttl
			});
			this.description = "";
			this.views = "";
			this.ttl = "";
			alert("Message sent")
		},
		async searchSecret() {
			const response = await axios.get('api/secret/'+this.hash);
			this.secret = response.data[0];
		}
	},
}
</script>

<style scoped>
	#app {
		margin: auto;
		margin-top: 3rem;
		max-width: 700px;
	}
	
</style>
