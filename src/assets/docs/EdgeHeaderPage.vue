<template>
  <div style="background: #ededed; padding-bottom: 100px">
  <!-- Purple Header -->
    <edge-header color="indigo"></edge-header>

    <!-- Main Container -->
    <container free-bird>
      <row>
        <column md="8" lg="7" class="mx-auto float-none white z-depth-1 py-2 px-2">

          <!--Naked Form-->
          <card-body>
            <h2 class="h2-responsive"><strong>Material Design Edge Headers</strong></h2>
            <p class="pb-4">Example of Material Design Form</p>

            <!--Body-->
            <form action="#">

              <h5 class="h5-responsive">Basic Textbox</h5>
              <!-- Basic textbox -->
              <md-input type="text" label="Example label"/>
              <!-- /.Basic textbox -->

              <h5 class="h5-responsive">Textbox with icon</h5>
              <div class="md-form">
                <md-input type="text" label="Your name" icon="user" />
              </div>

              <!--Email validation-->
              <h5 class="h5-responsive">E-mail validation</h5>
              <div class="md-form">
                <md-input type="email" label="Your email" icon="envelope" />
              </div>

              <!--Textarea with icon-->
              <h5 class="h5-responsive">Textarea</h5>
              <div class="md-form">
                <md-textarea type="text" label="Textarea" icon="pencil"></md-textarea>
              </div>

              <h5 class="h5-responsive">Disabled field</h5>
              <div class="md-form">
                <md-input type="text" label="Example label" disabled/>
              </div>

              <div class="text-xs-left">
                <button class="btn btn-primary">Submit</button>
              </div>
            </form>

            <div class="my-2">
                <p style="font-weight:300;font-size:0.75rem">Never submit your passwords here</p>
            </div>

          </card-body>
          <!--Naked Form-->

        </column>
      </row>
    </container>
  <!-- /.Main Container -->
  </div>
</template>

<script>
import { EdgeHeader, Container, Row, Column, CardBody, MdTextarea } from 'mdbvue';

export default {
  name: 'EdgeHeaderPage',
  components: {
    EdgeHeader,
    Container,
    Row,
    Column,
    CardBody,
    MdTextarea
  }
};
</script>

<style scoped>
</style>
