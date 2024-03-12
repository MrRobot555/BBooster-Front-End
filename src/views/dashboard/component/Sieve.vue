<template>
        <div
            class="level-container"
        >
            <v-col
              cols="12"
              class="m-0 p-0 text-center text-uppercase level-title"
            >
            <h3>{{levelTitle[index]}}</h3>
            </v-col>
            <v-col
              cols="12"
              class="m-0"
            >
            <div 
                class="s-centered"
                v-if="(!showMore)"
            >
                <candidate
                    v-for="(candidate, candidateIndex) in level.slice(0, 20)"
                    :key="candidateIndex" 
                    :networkcode="candidate.network_id"
                    :name="candidate.client_name"
                    :stars="index"
              />
            </div>
            <div 
                class="s-centered"
                v-else
            >
                <candidate
                    v-for="(candidate, candidateIndex) in level"
                    :key="candidateIndex" 
                    :networkcode="candidate.network_id"
                    :name="candidate.client_name"
                    :stars="index"
              />
            </div>

            <v-row 
                v-if="level.length > 20"
                class="m-0 p-0"
            >
                <v-col
                    cols="12"
                    class="m-0 pt-0 text-center"
                    :ref="'anchor-'+index"
                >
                <h4 
                    v-if="(!showMore)"
                    @click="scrollToAnchor()"
                    class="sieve-link"
                >
                    {{ level.length-20 }} more {{ index }} star candidates
                </h4>
                <h4 
                    v-else
                    @click="scrollToAnchor()"
                    class="sieve-link"
                >
                    show less {{ index }} star candidates
                </h4>
                </v-col>
            </v-row>

            <div class="s-centered sieve-title-pos">
              <img src="@/assets/sieve.svg" width="250px">
              <div class="sieve-title">
                <h4 class="text-center">{{sieveTitles.main}}</h4>
              </div>
              <div class="sieve-title post-operation-title">

                <v-icon 
                  class="m-0 p-0 star"
                  style="color: white;"
                >
                  mdi-star
                </v-icon>
                <h5 class="text-center">{{sieveTitles.sub}}</h5>
              </div>
            </div>
            </v-col>
        </div>
</template>

<script>
import candidate from "@/views/dashboard/component/Candidate.vue"
export default {
    name: 'Sieve',
    components: {
        candidate
    },
    props: ['level', 'index', 'sieveTitles'],
    data() {
        return {
            showMore: false,
            levelTitle: ['conversation started', 'interested candidates', 'candidates know your product', 'candidates got answers', 'candidates accepted your price'],
        }
    },
    methods: {
        scrollToAnchor() {
            const vm = this
            this.showMore = !this.showMore
            this.$nextTick(() => {
                const el = vm.$refs['anchor-'+vm.index];
                el.scrollIntoView({block: 'center'});
            });
        }
    }
}
</script>

<style scoped>
  .sieve-title-pos {
    flex-direction: column;
  }
  .sieve-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 50px;
    position: relative;
    top: -90px;
    color: white;
    background-color: #d800bc; 
  }
.s-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    flex-wrap: wrap;
    margin: 10px;
  }
.sieve-link {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
.post-operation-title {
    flex-direction: column;
    top: -90px;
    width: 85px;
    margin: 0;
    padding: 0;
    left: -2px;
    margin-bottom: -50px;
  }
.level-container {
    border: 5px dotted rgb(216, 0, 188);;
    border-radius: 10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}
.level-title {
    background-color: rgb(255, 222, 251);
    color: rgb(216, 0, 188);
    letter-spacing: 0.2rem;
}
</style>