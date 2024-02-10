<template>
  <v-form v-model="valido" ref="formulario" lazy-validation>
      <v-text-field
          label="Película:"
          v-model="nombre"
          :rules="reglasNombre"
          required
      ></v-text-field>
      <v-text-field
          label="Sinopsis:"
          v-model="sinopsis"
          multi-line
          required
          :rules="reglasSinopsis"
      ></v-text-field>
      <v-select
          label="Año de publicación:"
          v-model="anhopub"
          :rules="reglasPublicacion"
          :items="anhos"
      ></v-select>
      <v-text-field
          label="Género:"
          v-model="genero"
          required
          :rules="reglasGenero"
      ></v-text-field>


      <v-btn
          @click="guardar"
          :disabled="!valido"
      >Guardar</v-btn>
      <v-btn @click="limpiar">Limpiar</v-btn>
  </v-form>
</template>


<script>
import axios from 'axios';

export default {
  data: () => ({
    valido: true,
    nombre: '',
    sinopsis: '',
    genero: '',
    anhopub: '',
    reglasNombre: [
      v => !!v || 'La película es requerida',
    ],
    reglasGenero: [
      v => !!v || 'Genero de pelicula requerido',
      v => (v && v.length <= 80) || 'Genero debe ser menor o igual a 80 carateres',
    ],
    reglasPublicacion: [
      v => !!v || 'Año de publicacion es requerido',
    ],
    reglasSinopsis: [
      v => !!v || 'Sinopsis de pelicula requerida',
    ],
    select: null,
    anhos: [
      '2016',
      '1967',
      '2001',
      '1958',
      '1959',
      '2018',
    ],
  }),

  methods: {
    guardar() {
      if (this.$refs.formulario.validate()) {
      // Realizar siguiente acción
        return axios({
          method: 'post',
          data: {
            nombre: this.nombre,
            sinopsis: this.sinopsis,
            anhopub: this.anhopub,
            genero: this.genero,
          },
          url: 'http://localhost:8081/peliculas',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Grandioso!',
              'Pelicula Guardada satisfactoriamentos',
              'success',
            );
            this.$router.push({ name: 'Inicio' });
            this.$refs.formulario.reset();
          })
          .catch(() => {
            this.$swal();
          });
      }

      return true;
    },
    limpiar() {
      this.$refs.formulario.reset();
    },
  },
};
</script>
