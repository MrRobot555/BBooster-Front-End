<template>
        <div 
            class="candidate"
            :class="{ red: networkcode === '0', orange: networkcode === '1', purple: networkcode === '2', green: networkcode === '3' }"
            v-if="name"
        >
            {{name}}
            <div
                class="star-container"
                v-if="stars > 0"
            >
                <v-icon
                    v-for="(star, index) in stars"
                    :key="index"
                    class="m-0 p-0 star"
                    style="color: white;"
                >
                    mdi-star
                </v-icon>
            </div>
        </div>
</template>

<script>
export default {
    props: ['name', 'stars', 'networkcode'],
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    .candidate {
        min-width: 90px;
        height: 30px;
        color: white;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        margin: 10px;
        padding-left: 10px;
        padding-right: 10px;
        animation-name: shake;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        position: relative;
    }
    @keyframes shake {
        0%   {left: 0px;}
        50%  {left: 5px;}
        100% {left: 0px}
    }
    .red {
        background-color: red;
    }
    .purple {
        background-color: purple;
    }
    .orange {
        background-color: orange;
    }
    .green {
        background-color: green;
    }
    .star-container {
        background-color: darkorchid;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 10px;
        border: 2px solid white;
        position: absolute;
        top: -17px;
        right: -10px;
    }
</style>