<template>
  <container>
    <h2 class="my-5">Form login</h2>
    <row>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Sign in</p>
          <div class="grey-text">
            <md-input label="Your email" icon="envelope" type="email"/>
            <md-input label="Your password" icon="lock" type="password"/>
          </div>
          <div class="text-center">
            <btn>Login</btn>
          </div>
        </form>
      </column>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Sign in</p>
          <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
          <input type="email" id="defaultFormLoginEmailEx" class="form-control"/>
          <br/>
          <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
          <input type="password" id="defaultFormLoginPasswordEx" class="form-control"/>
          <div class="text-center mt-4">
            <button class="btn btn-indigo" type="submit">Login</button>
          </div>
        </form>
      </column>
    </row>
    <h2 class="my-5">Form register</h2>
    <row>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Sign up</p>
          <div class="grey-text">
            <md-input label="Your name" icon="user" type="text"/>
            <md-input label="Your email" icon="envelope" type="email"/>
            <md-input label="Confirm your email" icon="exclamation-triangle" type="text"/>
            <md-input label="Your password" icon="lock" type="password"/>
          </div>
          <div class="text-center">
            <btn color="primary">Register</btn>
          </div>
        </form>
      </column>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Sign up</p>
          <label for="defaultFormRegisterNameEx" class="grey-text">Your name</label>
          <input type="text" id="defaultFormRegisterNameEx" class="form-control"/>
          <br/>
          <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
          <input type="email" id="defaultFormRegisterEmailEx" class="form-control"/>
          <br/>
          <label for="defaultFormRegisterConfirmEx" class="grey-text">Confirm your email</label>
          <input type="email" id="defaultFormRegisterConfirmEx" class="form-control"/>
          <br/>
          <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
          <input type="password" id="defaultFormRegisterPasswordEx" class="form-control"/>
          <div class="text-center mt-4">
            <button class="btn btn-unique" type="submit">Register</button>
          </div>
        </form>
      </column>
    </row>
    <h2 class="my-5">Form subscription</h2>
    <row>
      <column md="6">
        <form>
          <p class="h5 text-center mb-4">Subscribe</p>
          <div class="grey-text">
            <md-input label="Your name" icon="user" type="text"/>
            <md-input label="Your email" icon="envelope" type="email"/>
          </div>
          <div class="text-center">
            <btn outline="info">Send <fa icon="paper-plane-o" class="ml-1"/></btn>
          </div>
        </form>
      </column>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Subscribe</p>
          <label for="defaultFormSubscriptionNameEx" class="grey-text">Your name</label>
          <input type="text" id="defaultFormSubscriptionNameEx" class="form-control"/>
          <br/>
          <label for="defaultFormSubscriptionEmailEx" class="grey-text">Your email</label>
          <input type="email" id="defaultFormSubscriptionEmailEx" class="form-control"/>
          <div class="text-center mt-4">
            <button class="btn btn-outline-purple" type="submit">Send<i class="fa fa-paper-plane-o ml-2"></i></button>
          </div>
        </form>
      </column>
    </row>
    <h2 class="my-5">Form contact</h2>
    <row>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Write to us</p>
          <div class="grey-text">
            <md-input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
            <md-input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <md-input label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
            <md-textarea :rows="2" label="Your message" icon="pencil"/>
          </div>
          <div class="text-center">
            <btn outline="secondary">Send <Fa icon="paper-plane-o" class="ml-1"/></btn>
          </div>
        </form>
      </column>
      <column md="6">
        <form>
          <p class="h4 text-center mb-4">Write to us</p>
          <label for="defaultFormContactNameEx" class="grey-text">Your name</label>
          <input type="text" id="defaultFormContactNameEx" class="form-control"/>
          <br/>
          <label for="defaultFormContactEmailEx" class="grey-text">Your email</label>
          <input type="email" id="defaultFormContactEmailEx" class="form-control"/>
          <br/>
          <label for="defaultFormContactSubjectEx" class="grey-text">Subject</label>
          <input type="text" id="defaultFormContactSubjectEx" class="form-control"/>
          <br/>
          <label for="defaultFormContactMessageEx" class="grey-text">Your message</label>
          <textarea type="text" id="defaultFormContactMessageEx" class="form-control" rows="3"></textarea>
          <div class="text-center mt-4">
            <button class="btn btn-outline-warning" type="submit">Send<i class="fa fa-paper-plane-o ml-2"></i></button>
          </div>
        </form>
      </column>
    </row>
    <h2 class="my-5">A form within a card</h2>
    <row>
      <column md="6">
        <card>
          <card-body>
            <form>
              <p class="h4 text-center py-4">Sign up</p>
              <div class="grey-text">
                <md-input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
                <md-input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <md-input label="Confirm your email" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
                <md-input label="Your password" icon="lock" group type="password" validate/>
              </div>
              <div class="text-center py-4 mt-3">
                <btn color="cyan" type="submit">Register</btn>
              </div>
            </form>
          </card-body>
        </card>                    
      </column>
      <column md="6">
        <div class="card mx-xl-5">
          <div class="card-body">
            <form>
              <p class="h4 text-center py-4">Subscribe</p>
              <label htmlFor="defaultFormCardNameEx" class="grey-text font-weight-light">Your name</label>
              <input type="text" id="defaultFormCardNameEx" class="form-control" />
              <br />
              <label htmlFor="defaultFormCardEmailEx" class="grey-text font-weight-light">Your email</label>
              <input type="email" id="defaultFormCardEmailEx" class="form-control" />
              <div class="text-center py-4 mt-3">
                <button class="btn btn-outline-purple" type="submit">Send<i class="fa fa-paper-plane-o ml-2"></i></button>
              </div>
            </form>
          </div>
        </div>
      </column>
    </row>
    <h2 class="my-5">A form within a modal</h2>
    <row>
      <column size="12" class="text-center mb-5">
        <btn @click.native="showModal = true" color="info">Launch modal contact form</btn>
        <modal v-if="showModal" @close="showModal = false" cascade class="text-left">
          <modal-header class="primary-color white-text">
            <h4 class="title"><fa class="fa fa-pencil" /> Contact form</h4>
          </modal-header>
          <modal-body class="grey-text">
            <md-input size="sm" label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
            <md-input size="sm" label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
            <md-input size="sm" label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/>
            <md-textarea size="sm" :rows="2" label="Your message" icon="pencil"/>
          </modal-body>
          <modal-footer>
            <btn color="secondary" @click.native="showModal = false">Close</btn>
            <btn color="primary">Save changes</btn>
          </modal-footer>
        </modal>
      </column>
    </row>
  </container>
</template>

<script>
import { Container, Column, MdTextarea, Btn, Fa, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'mdbvue';

export default {
  name: 'FormsPage',
  components: {
    Container, 
    Row,
    Column,
    MdTextarea,
    Btn, 
    Fa,
    Card,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
</style>
