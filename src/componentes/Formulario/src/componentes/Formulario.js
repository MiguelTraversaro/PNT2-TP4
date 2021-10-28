
export default {
  name: 'src-componentes-formulario',
  components: {},
  props: [],
  data () {
    return {
      formData: this.getInitialData(),
      formState: {},
      nombreMinLength: 5,
      nombreMaxLength: 15,
      edadMin: 18,
      edadMax: 120,
      url: "https://6175e83903178d00173daa13.mockapi.io/formulario",
      usuarios: [],
    }
  },
  computed: {

  },
  mounted() {
    console.log('formulario -> mounted()')
    this.pedirDatosAlServidor()
  },

  methods: {

    getInitialData(){
      return{
        nombre: "",
        edad: "",
        email: ""
      }
    },

    async enviarDatosAlServidor(usuarios) {
      try {
        let respuesta = await this.axios.post(this.url, usuarios, {'content-type':'application/json'})
        
        let datosRecibidos = respuesta.data
        console.log('datosRecibidos POST', datosRecibidos)

        this.pedirDatosAlServidor()
        this.datos.push(datosRecibidos)
      }
      catch(error) {
        console.error('Error en envío de datos del formulario', error)
      }
    },

    async pedirDatosAlServidor() {
      try {
        let respuesta = await this.axios(this.url)
        
        let usuarios = respuesta.data
        console.log('datos GET', usuarios)
        this.usuarios = usuarios
      }
      catch(error) {
        console.error('Error en recepción de datos del servidor', error)
      }
    },

    enviar() {
      let usuarios = {...this.formData}
      console.log(usuarios)
      this.enviarDatosAlServidor(usuarios)

      this.formData = this.getInicialData()
      this.formState._reset()
    }
    
  }
}


