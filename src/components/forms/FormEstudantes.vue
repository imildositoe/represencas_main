<template>
  <div id="content">
    <h3 class="text-left">Estudantes</h3><br>

    <section class="row">
      <div class="col-md-5">
        <h6 class="text-left">Selecione a Turma</h6>
        <select class="browser-default custom-select" name="turmas" @change="this.getValueOfTurma">
          <option v-for="t in turmas"
                  :value="t.id_regime+'-'+t.id_disciplina_curso+'-'+t.id_curso+'-'+t.id_alocacao">{{
              t.disciplina
            }} {{ t.ano }} {{ t.regime }}
          </option>
        </select>
      </div>

      <div class="col-md-3" style="margin-left: 33%;">
        <h6 class="text-left">Primeira Linha da Lista</h6>
        <input type="number" class="form-control" id="first_line" required min="1">
      </div>
    </section>
    <br><br>
    <div>
      <!--            <div class="form-group">-->
      <!--                <select name="state" id="max_rows" class="form-control">-->
      <!--                    <option value="5000">Show All</option>-->
      <!--                    <option value="5">5</option>-->
      <!--                    <option value="10">10</option>-->
      <!--                    <option value="15">15</option>-->
      <!--                    <option value="20">20</option>-->
      <!--                    <option value="50">50</option>-->
      <!--                    <option value="75">75</option>-->
      <!--                    <option value="100">100</option>-->
      <!--                </select>-->
      <!--            </div>-->
      <table class="col-lg-12 tabela" id="table-estudantes">
        <thead style="background-color: #f749a8;color: white;">
        <tr>
          <th>Numero do Estudante</th>
          <th>Apelido</th>
          <th>Outros Nomes</th>
          <th>Genero</th>
          <th>Data de Nascimento</th>
          <th>Acção</th>
        </tr>
        </thead>
        <tbody>
        <tr scope="row" v-for="e in estudantes" class="linha">
          <td>{{ e.nr_estudante }}</td>
          <td>{{ e.apelido }}</td>
          <td>{{ e.nome }}</td>
          <td>{{ e.genero }}</td>
          <td>{{ e.data_nascimento }}</td>
          <td class="text-left">
            <a href="#create" data-toggle="tooltip" title="Editar" class="action" style="margin-left: 25%;">&nbsp;<i
                class="fa fa-edit"/>&nbsp;</a>&nbsp;
            <a href="#" data-toggle="tooltip" title="Apagar" class="action">&nbsp;<i
                class="fa fa-times-circle"/>&nbsp;</a>&nbsp;
            <a href="#" data-toggle="tooltip" title="Adicionar Fingerprint" class="action" id="finger"
               v-if="e.is_finger_registered === null" v-on:click="patchTemplate($event)">
              <span>&nbsp;</span>
              <i class="fa fa-fingerprint">
                <input type="hidden" :value="e.id_estudante">
              </i>
              <span>&nbsp;</span>
              <!--                            <input type="hidden" :value="e.id_estudante">-->
            </a>
            <span v-if="e.is_finger_registered !== null">
                            &nbsp;
                            <i class="fa fa-check"/>
                        </span>
          </td>
        </tr>
        </tbody>
      </table>

      <!--            <div class="pagination-container">-->
      <!--                <nav>-->
      <!--                    <ul class="pagination"></ul>-->
      <!--                </nav>-->
      <!--            </div>-->
    </div>
    <input type="file" id="excel"/>
    <label for="excel" class="btn-upload label">
      <i class="fa fa-file-excel"/>
      Upload .xlsx
    </label>
    <hr>
    <hr>

    <div class="create col-lg-5" id="create">
      <br>
      <h6 class="text-left">Numero do Estudante</h6>
      <input type="text" class="form-control" id="nr_estudante"> <br>

      <h6 class="text-left">Apelido</h6>
      <input type="text" class="form-control" id="apelido"> <br>

      <h6 class="text-left">Outros Nomes</h6>
      <input type="text" class="form-control" id="nome"><br>

      <section class="demo-section">
        <h6 class="text-left">Genero</h6>
        <section>
          <div class="text-left radio">
            <input type="radio" name="genero" id="masc" value="M" checked>
            <label for="masc">&nbsp;Masculino</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="radio" name="genero" id="fem" value="F">
            <label for="fem">&nbsp;Feminino</label>
          </div>
        </section>
      </section>

      <br>

      <section class="demo-section">
        <h6 class="text-left">Data de Nascimento</h6>
        <section>
          <div>
            <input type="date" class="form-control" id="data">
          </div>
        </section>
      </section>
      <br>
      <btn class="btn-salvar btn-md" @click="saveStudent">Salvar</btn>
      <br><br><br>
    </div>

    <!--Modal preview-->
    <modal size="lg" id="modal">
      <modal-header>
        <modal-title>Estudantes da Lista Selecionada</modal-title>
      </modal-header>
      <modal-body>
        <h6 class="text-left file-name"><i class="fa fa-file-excel"/> {{ fileName }}</h6>
        <table class="col-lg-12 tabela">
          <thead style="background-color: #f749a8;color: white;">
          <tr>
            <th>Numero do Estudante</th>
            <th>Apelido</th>
            <th>Outros Nomes</th>
            <th>Genero</th>
            <th>Data de Nascimento</th>
          </tr>
          </thead>
          <tbody>
          <tr scope="row" v-for="e in this.arrayPreview" class="linha">
            <td>{{ e[0] }}</td>
            <td>{{ e[1] }}</td>
            <td>{{ e[2] }}</td>
            <td>{{ e[3] }}</td>
            <td>{{ e[4] }}</td>
          </tr>
          </tbody>
        </table>
      </modal-body>
      <modal-footer>
        <btn outline="default" darkWaves id="btn-cancel" class="btn-sm">Cancelar</btn>
        <btn id="btn-confirm" class="btn-sm">Confirmar</btn>
      </modal-footer>
    </modal>

    <!--Modal Fingerprint-->
    <modal size="lg" id="modalFinger">
      <modal-header>
        <modal-title>Registo da Impressão Digital</modal-title>
      </modal-header>
      <modal-body>
        <h6 class="text-left col-lg-12"><i class="fa fa-fingerprint pink-ic"/> Coloque o dedo no leitor </h6>
        <br>
        <div class="col-lg-12" style="display: flex">
          <div class="col-lg-7">
            <br><br><br><br>
            <div class="progress" style="height: 20px">
              <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                   :style="{'width' : percentage + '%'}" aria-valuenow="0" aria-valuemin="0"
                   aria-valuemax="100" id="progress-bar"></div>
            </div>
            <br><br>
            <h2 class="font-weight-bold"> {{ percentage }} % </h2>
          </div>
          <div class="col-lg-4">
            <img src="../../assets/img/fingerprint.png" class="img img-finger responsive-img" alt="Finger">
          </div>
        </div>
      </modal-body>
      <modal-footer>
        <btn outline="default" darkWaves id="btn-cancel-finger" class="btn-sm">Cancelar</btn>
        <btn id="btn-confirm-finger" class="btn-sm" @click="saveTemplate">Salvar</btn>
      </modal-footer>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Btn,
  NumericInput,
  Tbl,
  TblBody,
  TblHead,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from 'mdbvue';
import XLSX from 'xlsx';
import axios from 'axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css'
import {my_base_url} from "@/recycler/global";

Vue.use(VueToast);

export default {
  name: "FormEstudantes",
  components: {Tbl, TblBody, TblHead, Btn, NumericInput, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter},
  data() {
    return {
      value_turmas: {
        id_regime: '',
        id_disciplina_curso: '',
        id_curso: ''
      },
      estudantes: [],
      id_docente: localStorage.getItem('user_id'),
      turmas: [],
      ano: new Date().getFullYear(),
      arrayPreview: [],
      fileName: '',
      id_estudante_finger: '',
      percentage: 0,
      progresso: 3,
      image_url: 'C:\\Represencas\\pressed_fingerprint_templates\\fingerprint.png',
      id_alocacao: ''
    }
  },
  methods: {
    handleFile(e) {
      let files = e.target.files, f = files[0];
      let reader = new FileReader();
      this.fileName = f.name;
      let self = this;
      reader.onload = function (e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});

        //convert from workbook to array of arrays
        let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let dataArray = XLSX.utils.sheet_to_json(first_worksheet, {header: 1});

        //Filling arrayPreview from dataArray starting from 1
        for (let i = 1; i < dataArray.length; i++) {
          self.arrayPreview.push(dataArray[i]);
        }

        //Showing sneak preview of the excel handled data
        $('#modal').modal('show');
        $('#btn-confirm').on('click', function () {

          //Running into dataArray to persist into database API
          let first_line = parseInt($('#first_line').val());
          if ($('#first_line').val().trim() !== '') {
            for (let i = first_line - 1; i < dataArray.length; i++) {
              let
                  nr_estudante = dataArray[i][0],
                  apelido = dataArray[i][1],
                  nome = dataArray[i][2],
                  genero = dataArray[i][3],
                  data_nascimento = dataArray[i][4];

              //Getting the first name to formulate the email
              let array, first;
              try {
                array = nome.split(' ');
                if (array.length > 1) {
                  first = array[0];
                } else {
                  first = nome;
                }
              } catch (error) {
              }

              // Setting the ID values of the streams
              let selected = $('select[name=turmas]').val().split('-');
              this.id_regime = selected[0];
              this.id_disciplina_curso = selected[1];
              this.id_curso = selected[2];

              let
                  email = first + '.' + apelido + '@uem.ac.mz',
                  id_curso = this.id_curso;

              axios.post(my_base_url + 'save_students', {
                'apelido': apelido,
                'nome': nome,
                'nr_estudante': nr_estudante,
                'email': email.toLowerCase(),
                'senha': nr_estudante,
                'genero': genero,
                'data_nascimento': data_nascimento,
                'id_curso': id_curso
              }).then(response => {

                //yanking the id of the recently added student
                let id_estudante;
                axios.get(my_base_url + 'get_id_estudante?nr_estudante=' + nr_estudante)
                    .then(response => {
                      id_estudante = response.data.id_estudante[0].id_estudante;

                      //Saving the enrollment of the recently added student
                      axios.post(my_base_url + 'save_enrollments', {
                        'ano': new Date().getFullYear(),
                        'id_estudante': id_estudante,
                        'id_regime': this.id_regime,
                        'id_disciplina_curso': this.id_disciplina_curso
                      }).then(response => {
                        self.getStudents();
                      });
                    });
              });
            }
            Vue.$toast.open({
              message: 'Estudantes salvos com sucesso',
              type: 'success',
              position: 'top',
              duration: 3000,
              queue: false,
              dismissible: true
            });
          } else {
            Vue.$toast.open({
              message: 'Preencha o valor da linha inicial',
              type: 'error',
              position: 'top',
              duration: 3000,
              queue: false,
              dismissible: true
            });
          }
          $('#modal').modal('hide');
        });

        $('#btn-cancel').on('click', function () {
          $('#modal').modal('hide');
        });
      };
      reader.readAsArrayBuffer(f);
    },
    saveStudentsExcel() {
      document.getElementById('excel').addEventListener('change', this.handleFile, false);

    },
    saveStudent() {
      let self = this;
      let
          apelido = $('#apelido').val(),
          nome = $('#nome').val(),
          nr_estudante = $('#nr_estudante').val();

      //Getting the first name to formule the email
      let array, first;
      try {
        array = nome.split(' ');
        if (array.length > 1) {
          first = array[0];
        } else {
          first = nome;
        }
      } catch (error) {
      }

      if (array.length > 1) {
        first = array[0];
      } else {
        first = nome;
      }

      // Setting the ID values of the streams
      let selected = $('select[name=turmas]').val().split('-');
      this.id_regime = selected[0];
      this.id_disciplina_curso = selected[1];
      this.id_curso = selected[2];

      let
          email = first + '.' + apelido + '@uem.ac.mz',
          id_curso = this.id_curso,
          genero = $('input[name="genero"]:checked').val(),
          data_nascimento = $('#data').val();

      axios.post(my_base_url + 'save_students', {
        'apelido': apelido,
        'nome': nome,
        'nr_estudante': nr_estudante,
        'email': email.toLowerCase(),
        'senha': nr_estudante,
        'genero': genero,
        'data_nascimento': data_nascimento,
        'id_curso': id_curso
      }).then(response => {

        //yanking the id of the recently added student
        let id_estudante;
        axios.get(my_base_url + 'get_id_estudante?nr_estudante=' + nr_estudante)
            .then(response => {
              id_estudante = response.data.id_estudante[0].id_estudante;

              //Saving the enrollment of the recently added student
              axios.post(my_base_url + 'save_enrollments', {
                'ano': new Date().getFullYear(),
                'id_estudante': id_estudante,
                'id_regime': this.id_regime,
                'id_disciplina_curso': this.id_disciplina_curso
              }).then(response => {
                self.getStudents();
              });
            });

        Vue.$toast.open({
          message: 'Estudante salvo com sucesso',
          type: 'success',
          position: 'top',
          duration: 3000,
          queue: false,
          dismissible: true
        });
      });
    },
    getStudents() {
      axios.get(my_base_url + 'get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
          .then(response => {
            this.estudantes = response.data.estudantes;
          });
    },
    getStreams() {
      axios.get(my_base_url + 'get_turmas?id_docente=' + this.id_docente)
          .then(response => {
            this.turmas = response.data.turmas;

            // To fill the table initially
            this.value_turmas.id_regime = this.turmas[0].id_regime;
            this.value_turmas.id_disciplina_curso = this.turmas[0].id_disciplina_curso;
            this.value_turmas.id_curso = this.turmas[0].id_curso;
            axios.get(my_base_url + 'get_estudantes?id_disciplina_curso=' + this.value_turmas.id_disciplina_curso + '&id_regime=' + this.value_turmas.id_regime + '&ano=' + this.ano)
                .then(response => {
                  this.estudantes = response.data.estudantes;
                });
          });
    },
    getValueOfTurma: function () {
      let selected = $('select[name=turmas]').val().split('-');

      this.value_turmas.id_regime = selected[0];
      this.value_turmas.id_disciplina_curso = selected[1];
      this.value_turmas.id_curso = selected[2];

      this.getStudents();
    },
    patchTemplate: function () {
      this.id_alocacao = $('select[name=turmas]').val().split('-')[3];
      this.id_estudante_finger = event.target.children[0].value;
      // document.getElementById("btn-confirm-finger").disabled = true;
      this.percentage = 0;
      document.getElementById('progress-bar').style.width = '0%';
      $('#modalFinger').modal('show');
      axios.get('http://127.0.0.1:8081/api/start_session/' + this.id_alocacao)
          .then(response => {
            axios.get('http://127.0.0.1:8081/api/enroll_student')
                .then(response => {
                  axios.get('http://127.0.0.1:8081/api/get_enrollment_progress_2')
                      .then(response => {
                        this.progresso = 2;
                        axios.get('http://127.0.0.1:8081/api/get_enrollment_progress_1')
                            .then(response => {
                              this.progresso = 1;
                              axios.get('http://127.0.0.1:8081/api/get_enrollment_progress_0')
                                  .then(response => {
                                    this.progresso = 0;
                                  });
                            });
                      });
                });
          });
    },
    saveTemplate() {
      axios.patch('http://127.0.0.1:8081/api/save_template/' + this.id_estudante_finger)
          .then(response => {
            Vue.$toast.open({
              message: 'Impressão digital registada com sucesso',
              type: 'success',
              position: 'top',
              duration: 5000,
              queue: false,
              dismissible: true
            });

            this.getStudents();

            axios.get('http://127.0.0.1:8081/api/close_session')
                .then(response => {
                  console.log('Session has closed.')
                });
          });
      $('#modalFinger').modal('hide');
    },
    pagination() {
      let table = '#table-estudantes';
      $('#max-rows').on('change', function () {
        $('.pagination').html('');
        let trnum = 0;
        let max_rows = parseInt($(this).val());
        let total_rows = $(table + ' tbody tr').length;
        $(table + ' tr:gt(0)').each(function () {
          trnum++;
          if (trnum > max_rows) {
            $(this).hide();
          }
          if (trnum <= max_rows) {
            $(this).show();
          }
        });
        if (total_rows > max_rows) {
          let pagenum = Math.ceil(total_rows / max_rows);
          for (let i = 1; i <= pagenum;) {
            $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span></span>\</li>').show();
          }
        }
        $('.pagination li:first-child').addClass('active');
        $('.pagination li').on('click', function () {
          let pageNum = $(this).attr('data-page');
          let trIndex = 0;
          $('.pagination li').removeClass('active');
          $(this).addClass('active');
          $(table + ' tr:gt(0)').each(function () {
            trIndex++;
            if (trIndex > (max_rows * pageNum) || trIndex <= (max_rows * pageNum) - max_rows) {
              $(this).hide();
            } else {
              $(this).show();
            }
          });
        });
      });

      $(function () {
        $('table tr:eq(0)').prepend('<th>ID</th>');
        let id = 0;
        $('table tr:gt(0)').each(function () {
          id++;
          $(this).prepend('<td>' + id + '</td>');
        });
      });
    }
  },
  beforeMount() {
    if (localStorage.getItem('user_id') === 'null') {
      this.$router.push('/');
    }
    this.getStreams();
  },
  mounted() {
    let self = this;
    this.saveStudentsExcel();
    $('[data-toggle="tooltip"]').tooltip();

    $('#btn-cancel-finger').on('click', function () {
      $('#modalFinger').modal('hide');
      axios.get('http://127.0.0.1:8081/api/close_session')
          .then(response => {
            console.log('Session has closed.');
          });
    });

    setInterval(() => {
      if (self.progresso === 2) {
        if (self.percentage < 35) {
          self.percentage += 5;
        }
      } else if (self.progresso === 1) {
        if (self.percentage < 70) {
          self.percentage += 5;
        }
      } else if (self.progresso === 0) {
        if (self.percentage < 100) {
          self.percentage += 5;
        }
        //document.getElementById("btn-confirm-finger").disabled = false;
      }
    }, 10);
  }
}
</script>

<style scoped>
#content {
  margin: 2% 1% auto 18%;
  padding-left: 1%;
}

.btn-salvar {
  margin-left: 75%;
}

.btn-upload {
  margin-top: 1%;
  margin-left: 85%;
  border-radius: 3px;
}

.create {
  margin-top: 5%;
}

input[type="file"] {
  display: none;
}

.label {
  color: #dfffff;
  height: 40px;
  cursor: pointer;
  background-color: #2bbbad;
  padding: 1% 2% 3% 2%;
  margin-right: -2%;
  font-size: small;
}

.tabela {
  border: #cfc6c1 1px dotted;
  font-size: 9pt;
}

.linha {
  border-top: rgba(230, 221, 226, 0.77) 1px solid;
}

.linha:hover {
  background-color: #e5dae0;
  transition-duration: 0.1s
}

.action {
  color: #2c3e50;
}

.action:hover {
  text-decoration: underline;
}

#modal {
  display: none;
}

#modalFinger {
  display: none;
}

.file-name {
  text-decoration: underline;
  color: #217346;
  border: #cf99a9 1px dotted;
  background-color: #faf4ff;
  padding: .5%;
  margin-bottom: 2%;
}

.img-finger {
  border: #cfc6c1 1px dotted;
}

.radio {
  border: #cf99a9 1px dotted;
  padding-left: 2%;
  padding-top: 1%;
  background-color: white;
}
</style>