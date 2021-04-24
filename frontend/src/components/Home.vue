<template>
   <div class="container-fluid">
        <div class="row justify-content-center" >
            <div class="col-md-10 my-5" v-if="loading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
       <div class="row py-3 justify-content-center" v-if="!loading">
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
                     :default-sort = "{prop: 'name', order: 'descending'}">
                   
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
                            <span style="" v-for="(provider, key) in scope.row.providers" :key="key">
                                {{ provider.name }} {{ scope.row.providers && scope.row.providers.length > 1 ? ", " : "" }}
                            </span>
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
       <!-- ADD NEW CUSTOMER -->
       <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" @submit.prevent="addClient">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input id="name" class="form-control" type="text" v-model="form.name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="form-control" v-model="form.email" required />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input class="form-control" id="phone" type="text" v-model="form.phone" required />
                        </div>
                        <div class="form-group">
                            <label id="providers" class="typo__label">Providers</label>
                                <multiselect
                                    v-model="form.providers" 
                                    tag-placeholder="Add this as new provider" 
                                    placeholder="Search or add a provider" 
                                    label="name" 
                                    track-by="_id"
                                    id="providers"
                                    :options="providers" 
                                    :multiple="true" 
                                    :taggable="true"
                                    :required="true"
                                    :allowEmpty="false"
                                    ></multiselect>
                                    <p class="text-danger" v-if="providerError">
                                        Select at least one provider
                                    </p>
                        </div>
                        <p v-if="error" class="alert alert-danger py-2"> {{error}}</p>
                        <p class="alert alert-success py-2" v-if="success">{{success}}</p>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button  type="submit"  class="btn btn-primary">
                                <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Add Client
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        <!-- UPDATE FORM -->
        <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" @submit.prevent="updateClient">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input id="name" class="form-control" type="text" v-model="form.name" required />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="form-control" v-model="form.email" required />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input class="form-control" id="phone" type="text" v-model="form.phone" required />
                        </div>
                        <div class="form-group">
                            <label id="providers" class="typo__label">Providers</label>
                                <multiselect
                                    v-model="form.providers" 
                                    tag-placeholder="Add this as new provider" 
                                    placeholder="Search or add a provider" 
                                    label="name" 
                                    track-by="_id"
                                    id="providers"
                                    :options="providers" 
                                    :multiple="true" 
                                    :taggable="true"
                                    :required="true"
                                    :allowEmpty="false"
                                    ></multiselect>
                                    <p class="text-danger" v-if="providerError">
                                        Select at least one provider
                                    </p>
                        </div>
                        <p v-if="error" class="alert alert-danger py-2"> {{error}}</p>
                        <p class="alert alert-success py-2" v-if="success">{{success}}</p>
                        <div class="modal-footer">
                            <button @click="closeUpdate" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button  type="submit"  class="btn btn-primary">
                                <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Save Client
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
        <!-- DELETE CLIENT -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Delete Client</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div class="modal-body">
                        <p v-if="!deleteSuccess" class="alert alert-warning">Are you sure you want to delete this client.This action is irreversible.</p>
                        <p v-if="deleteError" class="alert alert-danger py-2"> {{deleteError}}</p>
                        <p class="alert alert-success py-2" v-if="deleteSuccess">{{deleteSuccess}}</p>
                        <div class="modal-footer">
                            <button v-if="!deleteSuccess" type="button" class="btn btn-primary" data-dismiss="modal">No</button>
                            <button v-if="deleteSuccess" type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button v-if="!deleteSuccess" type="button" @click="deleteClient"  class="btn btn-danger">
                                <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            loading: false,
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
        this.fetchData()
       
    },
    methods: {
        async fetchData() {
            this.loading = true
            const providers = await this.$store.dispatch('fetchProviders')
            const clients = await  this.$store.dispatch('fetchClients')
            this.loading = false
        },
        setPage (val) {
            this.page = val
        },
        createNewClient(){
            this.title = "New Client"
            this.success = ''
            this.error = ''
            this.isNew = true
            this.form = {}
        },
        handleDelete(index, id) {
            this.id = id
            this.key = index
            this.deleteSuccess = ''
            this.deleteError = ''
        },
        handleEdit(index, data) {
            this.key = index
            this.success = ''
            this.error = ''
            this.title = 'Edit Client'
            this.isNew = false
            this.id = data._id
            // update form
            this.form.name = data.name
            this.form.email = data.email
            this.form.phone = data.phone
            this.form.providers = data.providers
        },
         deleteClient() {
            this.isLoading = true
            const data = {
                key:this.key,
                id:this.id
            }
            this.$store.dispatch('deleteClient', data).then( response => {
                if(response) {
                    this.isLoading = false
                    this.deleteSuccess = "Client delete success"
                }
            }).catch( err => {
                this.isLoading = false
                 if(err) {
                   this.deleteError = err.response.data.error.message
                   this.isLoading = false
                }
                if(err?.response?.data == undefined) {
                   this.deleteError = "Network error"
                    this.isLoading = false
                }
            })
         },
       updateClient() {
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
            let formData = {
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone,
                providers: newProvider
            }

            const data = {
                data:formData,
                key: this.key,
                id:this.id
            }
             this.$store.dispatch('updateClient', data).then( response => {
               if(response) {
                    this.success = "Client updated successfully"
                    this.isLoading = false
                }
             }).catch (err =>{
                     if(err) {
                   this.error = err.response.data.error.message
                   this.isLoading = false
                }
                if(err?.response?.data == undefined) {
                    this.error = "Network error"
                    this.isLoading = false
                }
            })

         },
         closeUpdate(){
             this.form = {

             }
         },
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
                if(err) {
                   this.error = err.response.data.error.message
                   this.isLoading = false
                }
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