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
            // chiave che regola il funzionamento di sbarratura dei task item
            doneTask: null,
            // oggetto template per le nuove task
            newTask: {
                text: '',
                done: false
            },
            // chiave che regola l'attivazione del messaggio di errore se l'input è troppo corto
            errorMessage: null,
            // chiave che regola la comparsa o scomparsa del tag che contiene il messaggio di errore
            inputError: false
        };
    },
    methods: {
        // funzione che "sbarra" o rimuove la "sbarratura" ai task item quando vengono cliccati
        // index ---> indice dell'elemento che regola l'item su cui attivare la funzione
        lineThrough(index){
            // se l'elemento è sbarrato elimina la sbarratura al click
            if(this.tasks[index].done){
                this.tasks[index].doneTask = '';
                this.tasks[index].done = false;
            // altrimenti se non è sbarrato aggiunge la sbarratura al click
            }else if(!this.tasks[index].done){
                this.tasks[index].doneTask = 'done';
                this.tasks[index].done = true;
            }
        },
        // funzione che verifica al caricamento della pagina se i task item devono essere sbarrati
        lineThroughAutoplay() {
            // per ogni task inserita nell'array tasks
            this.tasks.forEach((singleTask, index) => {
                // se il valore della chiave done è true allora aggiunge la classe css che sbarra il task item
                if(singleTask.done){
                    this.tasks[index].doneTask = 'done';
                // altrimenti se il valore della chiave done è false allora elimina la classe css al task item
                }else if(!singleTask.done){
                    this.tasks[index].doneTask = '';
                }
            });
        },
        // funzione che permette di togliere una task dall'elenco e dall'array tasks
        // index ---> indice dell'elemento da eliminare
        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
        // funzione che permette di aggiungere nuove task all'array tasks
        addNewTask() {
            // se l'input inserito ha almeno 5 caratteri
                // pusha il nuovo elemento come primo elemento dell'array
                // imposta la chiave che regola la comparsa del tag contenente 
                    //il messaggio di errore a false e nasconde il tag
                // pulisce il campo input tornando al placeholder
            if (this.newTask.text.length >= 5){
                this.tasks.unshift(this.newTask);
                this.inputError = false;
                this.newTask =
                {
                    text: '',
                    done: false
                }
            }else{
                // altrimenti attiva il tag contenente il messaggio di errore
                // popola il tag HTML con il messaggio di errore
                this.inputError = true;
                this.errorMessage = 'Devi inserire almeno 5 caratteri'
            }
        }
    },
    mounted() {
        // al caricamento della pagina esegue il check delle task e sbarra quelle con la chiave done con valore true
        this.lineThroughAutoplay();
    }
}).mount('#app');