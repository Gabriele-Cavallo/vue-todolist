// Rifare l'esercizio della to do list.

// Questa volta però ogni todo sarà un oggetto, formato da due proprietà:

// - text, una stringa che indica il testo del todo
// - done, un booleano (true/false) che indica se il todo è stato fatto oppure no

// MILESTONE 1

// Stampare all'interno di una lista HTML un item per ogni todo.
// Se la proprietà done è uguale a true, visualizzare il testo del todo sbarrato.

// MILESTONE 2

// Visualizzare a fianco ad ogni item ha una "x": cliccando su di essa, il todo viene rimosso dalla lista.

// MILESTONE 3

// Predisporre un campo di input testuale e un pulsante "aggiungi": cliccando sul pulsante, il testo 
// digitato viene letto e utilizzato per creare un nuovo todo, che quindi viene aggiunto alla lista dei todo esistenti.

// Bonus:

// 1- oltre al click sul pulsante, intercettare anche il tasto ENTER per aggiungere il todo alla lista
// 2- cliccando sul testo dell'item, invertire il valore della proprietà done del todo corrispondente (se done 
//era uguale a false, impostare true e viceversa)

const { createApp } = Vue;

createApp({
   data() {
        return {
            tasks: [
                {
                    text: 'Ciao sono una task-1',
                    done: false,
                },
                {
                    text: 'Ciao sono una task-2',
                    done: true,
                },
                {
                    text: 'Ciao sono una task-3',
                    done: false,
                }
            ],
            doneTask: null,
            newTask: {
                text: '',
                done: false
            },
            errorMessage: null,
            inputError: false
        };
    },
    methods: {
        lineThrough(index){
            if(this.tasks[index].done){
                this.tasks[index].doneTask = '';
                this.tasks[index].done = false;
            }else if(!this.tasks[index].done){
                this.tasks[index].doneTask = 'done';
                this.tasks[index].done = true;
            }
        },
        lineThroughAutoplay() {
            this.tasks.forEach((singleTask, index) => {
                if(singleTask.done){
                    this.tasks[index].doneTask = 'done';
                }else if(!singleTask.done){
                    this.tasks[index].doneTask = '';
                }
            });
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
        addNewTask() {
            if (this.newTask.text.length >= 5){
                this.tasks.unshift(this.newTask);
                this.inputError = false;
                this.newTask =
                {
                    text: '',
                    done: false
                }
            }else{
                this.inputError = true;
                this.errorMessage = 'Devi inserire almeno 5 caratteri'
            }
        }
    },
    mounted() {
        this.lineThroughAutoplay();
    }
}).mount('#app');