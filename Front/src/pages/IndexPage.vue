<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm">
      <q-input
        class="col"
        @keyup.enter="addTask"
        square
        standout
        v-model="newTask"
        placeholder="Add task (Ex : Be yourself)"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        @click="task.done = !task.done"
        v-for="(task, index) in tasks"
        :key="task.title"
        v-ripple
        clickable
        :class="{ done: task.done }"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            color="primary"
            class="no-pointer-events"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side
          ><q-btn
            flat
            round
            color="primary"
            icon="delete"
            @click.stop="deleteTask(task.title, index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary"> </q-icon>
      <div class="text-h5 text-prymary text-center">No task</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Meta } from '../components/models';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {},
  setup() {
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { meta };
  },
  data() {
    return {
      newTask: '',
      tasks: [
        {
          title: 'name',
          done: false,
        },
      ],
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      fetch('http://localhost:3000/task/get')
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          for (var i = 0; i < res.tasks.length; i++) {
            this.tasks.push({
              title: res.tasks[i].name,
              done: false,
            });
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    async deleteTask(name: string, index: number) {
      var id = "ok let's go";
      var requestOptions = {
        method: 'DELETE',
      };
      fetch('http://localhost:3000/task/get/')
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          for (var i = 0; i < res.tasks.length; i++) {
            if (res.tasks[i].name === name) {
              id = res.tasks[i]._id;
              return 0;
            }
          }
        })
        .catch((error) => console.log('error', error))

        .finally(() => {
          fetch('http://localhost:3000/task/delete/' + id, requestOptions)
            .then((data) => {
              return data.json();
            })
            .finally(() => {
              this.tasks.splice(index, 1);
            });
        });
    },
    addTask() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        name: this.newTask,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      fetch('http://localhost:3000/task/create', requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.tasks.push({
            title: this.newTask,
            done: false,
          });
          this.newTask = '';
        })
        .catch((error) => console.log('error', error));
    },
  },
});
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: red;
  }
}
.no-task {
  opacity: 0.4;
}
</style>
