<template>
    <div>
        <div style="margin-bottom: 10px">
            <el-row>
                <el-col :span="18">
                    <el-button @click="onCreate">create 1 row</el-button>
                    <el-button @click="onCreate100">create 100 row</el-button>
                    <el-button @click="bulkDelete">bulk delete</el-button>
                </el-col>

                <el-col :span="6">
                    <el-input placeholder="search NO." v-model="filters[0].value"></el-input>
                </el-col>
            </el-row>
        </div>

        <data-tables :data="data" :action-col="actionCol" :filters="filters" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom"></el-table-column>
        </data-tables>
    </div>
</template>

<script>
    // import ElementUI from 'element-ui'
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css'
    import Vue from 'vue'

    Vue.use(ElementUI);

    import lang from 'element-ui/lib/locale/lang/en'
    import locale from 'element-ui/lib/locale'

    locale.use(lang);

    // import DataTables and DataTablesServer separately
    import {DataTables, DataTablesServer} from 'vue-data-tables'

    Vue.use(DataTables);
    Vue.use(DataTablesServer);

    // import DataTables and DataTablesServer together
    import VueDataTables from 'vue-data-tables'

    Vue.use(VueDataTables);

    export default {
        name: "DataTable",
        components: {},
        data() {
            return {
                data: [],
                titles: [
                    'A', 'B'
                ],
                filters: [{
                    prop: 'flow_no',
                    value: ''
                }],
                actionCol: {
                    props: {
                        label: 'Actionssss',
                    },
                    buttons: [{
                        props: {
                            type: 'primary'
                        },
                        handler: row => {
                            this.$message('Edit clicked');
                            row.flow_no = 'hello word' + Math.random();
                            row.content = Math.random() > 0.5 ? 'Water flood' : 'Lock broken';
                            row.flow_type = Math.random() > 0.5 ? 'Repair' : 'Help'
                        },
                        label: 'Edit'
                    }, {
                        handler: row => {
                            this.data.splice(this.data.indexOf(row), 1);
                            this.$message('delete success')
                        },
                        label: 'delete'
                    }]
                },
                selectedRow: []
            }
        },
        methods: {
            onCreate() {
                this.data.push({
                    content: "new created",
                    flow_no: "FW201601010003" + Math.floor(Math.random() * 100),
                    flow_type: "Help",
                    flow_type_code: "help"
                })
            },
            onCreate100() {
                [...new Array(100)].map(_ => {
                    this.onCreate()
                })
            },
            handleSelectionChange(val) {
                this.selectedRow = val
            },
            bulkDelete() {
                this.selectedRow.map(row => {
                    this.data.splice(this.data.indexOf(row), 1)
                });
                this.$message('bulk delete success')
            }
        },
        beforeMount() {
        }
    }
</script>

<style scoped>

</style>