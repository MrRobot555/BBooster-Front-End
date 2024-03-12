<template>
    <v-menu
            :close-on-content-click="false"
            v-model="menu"
            transition="v-scale-transition"
            offset-y
            :nudge-left="40"
    >
    <template v-slot:activator="{ on }">
        <v-text-field
                :label="label"
                v-model="actualDatetime"
                readonly
                v-on="on"
        />
    </template>

    <v-card>
        <v-toolbar
        color="transparent"
        dark
        flat
        >

        <template v-slot:extension>
            <v-tabs
            v-model="tab"
            centered
            icons-and-text
            class="centered-tabs"
            >
            <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>
                    DATE
                    <v-icon>mdi-calendar-month</v-icon>
                </v-tab>
                <v-tab>
                    TIME
                    <v-icon>mdi-clock</v-icon>
                </v-tab>
            </v-tabs>
        </template>
    </v-toolbar>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                    <v-date-picker
                            ref="calendar"
                            v-model="dateModel"
                            no-title
                            scrollable
                            actions
                    ></v-date-picker>
            </v-tab-item>
            <v-tab-item>
                    <v-time-picker
                            ref="timer"
                            v-model="timeModel"
                            no-title
                            scrollable
                            format="24hr"
                            actions
                            @click:minute="checkMinutes"
                            @click:hour="checkHours"
                            @input="prepareTimeTags"
                    ></v-time-picker>
            </v-tab-item>
        </v-tabs-items>
    </v-card>


<!--     <template v-slot:extension>
        <v-tabs ref="tabs" v-model="selectedTab" grow icons light>
            <v-tab>
                <v-icon>event</v-icon>
            </v-tab>
            <v-tab>
                <v-icon>access_time</v-icon>
            </v-tab>
        </v-tabs>
    </template>

    <v-tabs-items v-model="selectedTab">
                <v-tabs-item
                    id="calendar">
                    <v-date-picker
                            v-model="dateModel"
                            no-title
                            scrollable
                            actions
                            @input="checkHours"
                    ></v-date-picker>
                </v-tabs-item>
                <v-tabs-item
                    id="timer">
                    <v-time-picker
                            ref="timer"
                            v-model="timeModel"
                            no-title
                            scrollable
                            format="24hr"
                            actions
                            @input="checkMinutes"
                    ></v-time-picker>
                </v-tabs-item>
    </v-tabs-items> -->


    </v-menu>
</template>

<script>
export default {
    name: 'DateTimePicker',
    props: {
        datetime: {
            type:String,
            required:true,
        },
        label: {
            type:String,
            default:''
        }
    },
    data() {
        return {
            tab: null,
            items: [
                'DATE', 'TIME',
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            dateModel: '',
            timeModel: '',
            hourModel: '',
            minuteModel: '',
            menu: false,
            selectedTab: "calendar"
        }
    },
        watch: {
            menu(val) {
                if (val) {
                    this.selectedTab="calendar"
                    if(this.$refs.timer)
                        this.$refs.timer.selectingHour=true
                }
            }
        },
        computed: {
            actualDatetime() {
                return this.dateModel+' '+this.hourModel+':'+this.minuteModel
            },
        },
        methods: {
            checkHours(val) {
                    this.hourModel=val
                    this.selectedTab="timer"
            },
            checkMinutes(val) {
                    this.minuteModel=val
                    this.selectedTab="calendar"
                    this.$emit('input',this.actualDatetime)
                    this.menu=false
            },
            prepareTimeTags() {
                console.log('preparing time tags')
                this.hourModel = this.timeModel.split(':')[0]
                this.minuteModel = this.timeModel.split(':')[1]                   
            }
        },
        created(){
            this.dateModel = this.datetime.split(' ')[0]
            this.timeModel = this.datetime.split(' ')[1]
            this.prepareTimeTags()
        }
}
</script>
<style scoped>


.v-application {
    height: 20px!important;
    background-color: transparent!important;
}
.v-toolbar {
    height: 100%!important;
}

.v-application--is-ltr .v-tabs--align-with-title > .v-tabs-bar:not(.v-tabs-bar--show-arrows) > .v-slide-group__wrapper > .v-tabs-bar__content > .v-tab:first-child, .v-application--is-ltr .v-tabs--align-with-title > .v-tabs-bar:not(.v-tabs-bar--show-arrows) > .v-slide-group__wrapper > .v-tabs-bar__content > .v-tabs-slider-wrapper + .v-tab {
    margin-left: 0!important;
}

.v-card {
    margin-top: 0px!important;
    margin-bottom: 0px!important;
}

.centered-tabs {
    background-color: yellow;
}
</style>

<style>
.v-toolbar__content {
    display: none!important;
}

.v-toolbar__content, .v-toolbar__extension {
    padding: 0!important;
}

.v-time-picker-clock__hand:before {
    background-color: #9c27b0 !important;
    border-color: #9c27b0 !important;
    width: 40px;
    height: 40px;
    display: block;
}
</style>