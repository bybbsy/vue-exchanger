<template>
  <main-layout>
    <div class="home" v-if="offers.length">
      <button type="submit" class="submit flex mx-5 bg-green-100 px-5 py-2 mx-auto" @click.prevent="handleCreate">Create</button>
      <div class="cards mx-5 flex flex-wrap gap-5 justify-center" v-if="offers">
        <div class="card flex flex-col my-5" v-for="(offer, i) in offers" :key="i">
          
          <div class="top-row flex flex-col justify-self-stretch">
            <div class="user flex items-center">
              <div class="avatar mr-2">
                <img :src="offer.avatar" alt="">
              </div>
              <div class="row">
                <div class="username">
                  <input type="text" v-model="offers[i].username" class="outline-blue-200">
                </div>
                <div class="email">
                  <input type="text" v-model="offers[i].email" class="outline-blue-200">
                </div>
              </div>
            </div>
            <div class="title mt-2">
              <input type="text" name="title" v-model="offers[i].title" class="font-bold w-full outline-blue-200">
            </div>
            <div class="description mt-2">
              <textarea name="description" cols="10" v-model="offers[i].description" class="block w-full text-sm outline-blue-200"></textarea>
            </div>
          </div>
          <div class="price flex justify-end mb-5">
            <input type="text" name="cost" v-model="offers[i].cost" class="inline-flex mr-1 text-right outline-blue-200">
            <input type="text" name="currency" v-model="offers[i].currency" class="inline-flex w-10 outline-blue-200">
          </div>
          <div class="buttons flex justify-between">
            <button type="submit" class="submit flex mx-5 bg-blue-100 px-5 py-2 w-full" @click.prevent="handleUpdate(offer)">Update</button>
            <button type="submit" class="submit flex mx-5 bg-red-400 px-5 py-2 w-full" @click.prevent="handleDelete(offer, i)">Delete</button>
          </div>
        </div>
      </div>
      <the-loader v-else></the-loader>
    </div>
  </main-layout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive } from 'vue';
import { getMockOffers, updateMockOffer, MockOffer, deleteMockOffer, createMockOffer } from '@/data/services/mockAPI/mockAPI';
import mainLayout from '@/layouts/mainLayout.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    mainLayout,
    theLoader: defineAsyncComponent(() => import('@/components/Loader.vue'))
  },
  data() {
    return {
      offers: [] as MockOffer[],
      newOffer: {
        title: 'Offer job',
        description: 'Hello',
        cost: '100.00',
        currency: '$',
        email: 'Jeff@mail.ru',
        username: 'Jeff tested',
        avatar: '',
      } as Omit<MockOffer, 'id'>
    }
  },
  methods: {
    handleUpdate(offer: MockOffer) {
      updateMockOffer(offer);
    },
    handleDelete(offer: MockOffer, i: number) {
      deleteMockOffer(offer);
      this.offers.splice(i, 1);
    },
    async handleCreate() {
      console.log(this.newOffer)
      await createMockOffer(this.newOffer);
      this.offers = await getMockOffers();
    }
  },
  async mounted() {
    this.offers = await getMockOffers();
  }
});
</script>

<style scoped>
.card {
  min-width: 300px;
  width: 500px;
  border-radius: 10px;
  border: 1px solid rgba(179, 179, 179, 0.555);
  padding: 12px 6px;
}


.avatar img {
  background-color: #666;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.submit {
  cursor: pointer;
}
</style>1
