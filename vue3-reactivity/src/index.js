// import { reactive } from "@vue/reactivity";
import { reactive } from "./vue3/reactivity";

const state = reactive({
      name: '徐',
      age: 25,
      info: {
            job: 'teacher',
            students: [
                  {
                        id: 1,
                        name: '小张'
                  },
                  {
                        id: 2,
                        name: '小王'
                  },
            ]
      },
      hobby: ['piano', 'travel', 'film']
});

// state.name;

// state.name = '毛';

// state.info.job = 'FE teacher';

state.hobby.push('coding');