<template>
   <div class="container-fluid">
       <div class="row py-3 justify-content-center">
           <div class="col-md-10 py-4">
                <h2>Clients
                    <button @click="createNewClient" type="primary" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" style="float:right">New Client</button>
                </h2>
            </div>
            <div class="col-md-10">
                 <el-table
                    :data="clients.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    border stripe
                    style="width: 100%"
                     :default-sort = "[
                     {prop: 'name', order: 'descending'},
                     {prop: 'email', order: 'descending'},
                     {prop: 'phone', order: 'descending'},
                     {prop: 'providers', order: 'descending'}]">
                   
                    <el-table-column
                    label="Name"
                    width="200" prop="name" sortable>
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.name }}</span>
                    </template>
                    </el-table-column>

                     <el-table-column
                        label="Email"
                        prop="email"
                        width="200" sortable>
                        <template slot-scope="scope">
                            <span style="">{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="Phone"
                        prop="phone"
                        width="200" sortable>
                        <template slot-scope="scope">
                            <span style="">{{ scope.row.phone }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="providers"
                        label="Providers"
                        width="296" sortable>
                        <template slot-scope="scope">
                            <span style="" v-for="(provider, key) in scope.row.providers" :key="key">{{ provider.name }} {{", "}}</span>
                        </template>
                    </el-table-column>
                    
                    
                    <el-table-column
                     >
                     
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            size="mini"
                            placeholder="Search by name"/>
                        </template>
                   

                    <template slot-scope="scope">
                        <el-button
                            style="margin-left: 11px; margin-top: 5px; margin-bottom:5px; margin-right:10px; width:70px"
                            size="mini"
                            type="primary"
                            data-toggle="modal" data-target="#updateModal" 
                            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                            style="margin-right:10px; width:70px"
                            size="mini"
                            type="danger" data-toggle="modal" data-target="#deleteModal"
                            @click="handleDelete(scope.$index, scope.row._id)">Delete</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
       </div>
       <!-- modal contents -->
     
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
    name:'home', 
    components: { Multiselect },
    data() {
        return {
            search:'',
             page: 1,
            pageSize: 10,
            providerError:false,
            form: {
                name:'',
                email:'',
                phone:'',
                providers:[],
            },
            isLoading: false,
            error:'',
            success:'',
            deleteSuccess:'',
            deleteError: '',
            id:'',
            index:'',
            editSuccess: '',
            editError: '',
            title:'',
            isNew: true
        }
    },
    computed: {
        ...mapGetters(['clients', 'providers']),
    },
    mounted() {
        this.$store.dispatch('fetchProviders')
        this.$store.dispatch('fetchClients')
    },
    methods: {
      
         addClient() {
            this.success = ''
            this.error = ''

            const newProvider = []
            if(this.form.providers && this.form.providers.length < 1) {
                this.providerError = true
                return
            }

            this.isLoading = true

            this.form.providerError = false
            this.form.providers.forEach( provider => newProvider.push(provider._id))
            const data = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                providers: newProvider
            }
            
             this.$store.dispatch('addClient', data).then( response => {
               if(response) {
                    this.success = "Client created successfully"
                    this.isLoading = false

                    this.form = {

                    }
                }
             }).catch (err =>{
                console.log(err)
                if(err?.response?.data == undefined) {
                    this.error = "Network error"
                    this.isLoading = false
                }
            })

        }
    }
    
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>