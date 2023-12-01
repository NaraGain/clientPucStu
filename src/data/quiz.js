
const quiz = [
    {
        "id" : "01",
        "progress" : 0,
        "task" : false,
        "type" : "writing",
        "name" : "Writing",
        "question":  [ { 
            "qid" : "01",
            "completed":false,
               "file": {"id": "01", "type":null,
                "src":["Describe three advanges of living abroad.","Describe three advantages of traveling aboard.","Dsecribe your happay memory in life."]},
            "number-word" : "100",
            "clude" : [
                    { "id" : "01" , "choice" :null, selected:false},
                   
                
            ]
        }
        ]
    },
    
{
        "id" : "02",
        "type" : "MQC",
        "progress" : 10,
        "task" : false,
        "name" : "Reading",
        "question" : [
            {
                "qid":"01",
                "completed":true,
                "type":"checkbox",
                "categorie" : "image",
                "file": {"id": "01","header" : "Why do introvert adn extroverts react so differently?" , 
                 "type" : "image",  "src":"https://www.ieltsjacky.com/images/MatchingInformationCarsText.jpg"},
                "categories": "multiple Chocice",
                "question":["what is the capital of Uruguay is_____?"],
                "clude":[
                    {"id":"01", "choice":"reading can help you feel less iritated","isCorrect" : false },
                    {"id":"02", "choice":"More people are enjoying a books and turing off the television","isCorrect" : false },
                    {"id":"03", "choice":"Books can incrase your awareness and help you to be open-minded.","isCorrect" : true },
                    {"id":"04", "choice":"Choosing book is no more diffucult than slecting a film","isCorrect" : false }
                ]
            
            },
    
            {
                "qid":"02",
                "type":"checkbox",
                "completed":true,
                "file": {"id": "01","header" : "What is A book ?" ,
                "type" : "image", 
                 "src":"https://www.ieltsjacky.com/images/MatchingInformationCarsText.jpg"},
                "categories": "multiple Chocice",
                "question":["what is the capital of Uruguay is_____?"],
                "clude":[
                    {"id":"01", "choice":"reading can help you feel less iritated","isCorrect" : false },
                    {"id":"02", "choice":"More people are enjoying a books and turing off the television","isCorrect" : true },
                    {"id":"03", "choice":" 'IoAtCircleOutline' is defined but never used .","isCorrect" : true },
                    {"id":"04", "choice":"Choosing book is no more diffucult than slecting a film","isCorrect" : false }
                ]
            
            },
            {
                "qid":"03",
                "type":"checkbox",
                "completed":true,
                "file": {"id": "01","header" : "What is A book ?" ,  "type" : "image",  "src":"https://www.ieltsjacky.com/images/MatchingInformationCarsText.jpg"},
                "categories": "multiple Chocice",
                "question":["what is the capital of Uruguay is_____?"],
                "clude":[
                    {"id":"01", "choice":"reading can help you feel less iritated","isCorrect" : false },
                    {"id":"02", "choice":"More people are enjoying a books and turing off the television","isCorrect" : true },
                    {"id":"03", "choice":"'Grammar' is defined but never used ","isCorrect" : false },
                    {"id":"04", "choice":"Choosing book is no more diffucult than slecting a film","isCorrect" : false }
                ]
            
            },
          
    
        ]
    
    
    },
     {
        "id" : "03",
        "type" : "MQC",
        "progress" : 90,
        "task" : false,
        "name" : "Grammer",
        "question" : [
            {
                "id" : "01",
                "completed":false,
                "file": {"id": "01", "src":null},
                "type" : "checkbox",
                "question" : ["If you_____ to my advice in firt place, you______in a mess right now"],
                "clude":[
                   { "id" : "1","choice": "listen/wouldn't be"},
                  { "id" : "2", "choice" : "had listend/wouldn't been" },
                  { "id" : "3", "choice" : "had/listend/wouldn't be" },
                  { "id" : "4", "choice" : "listend wouldn't be" }
                ]
            },
            {
                "qid" : "02",
                "completed":false,
                "type" : "checkbox",
                "file": {"id": "01", "src":null},
                "question" : ["If i _______ French in high school, I______ more job opportunities now."],
                "clude":[
                   { "id" : "1","choice": "had taken/ would have"},
                  { "id" : "2", "choice" : "had taken/would not have" },
                  { "id" : "3", "choice" : "had not taken/would have had" },
                  { "id" : "4", "choice" : "taken/ would had" }
                ]
            },
            {
                "qid" : "03",
                "completed":false,
                "type" : "checkbox",
                "file": {"id": "01", "src":null},
                "question" : ["If she______ in the United State. she_____a visa to work here."],
                "clude":[
                   { "id" : "1","choice": "had be born/ would have"},
                  { "id" : "2", "choice" : "had taken/would not have" },
                  { "id" : "3", "choice" : "had not taken/would have had" },
                  { "id" : "4", "choice" : "taken/ would had" }
                ]
            },
           
         
        ]
    },
    
  {
        "id" : "04",
        "type" : "Blank",
        "progress" : 60,
        "task" : false,
        "name" : "Vocabulary",
        "question" : [
            {
                "qid":"01",
                "completed":false,
                "file": {"id": "01", "src":["confused","stay out trouble","respeed","unfair","acceptable","undifferent","keep  in touch"],},
                "categories":"Fill in blank",
                "type" : "input",
                "clude" : [],
                "question" :["To get a promotion, you'd better work hard and show < for your boss."],
               
            },
            {
                "qid":"02",
                "completed":false,
                "file": {"id": "01", "src":null},
                "categories":"Fill in blank",
                "type" : "input",
                "question" :["I sometime get< about how and when to use past simple and pressent ferfect. Teacher said that I had to paractice doing more excrcise to get better."],
                "clude" : []
               
            },
            {
                "qid":"05",
                "completed":false,
                "file": {"id": "01", "src":null},
                "categories":"Fill in blank",
                "type" : "input",
                "question" :["Before Jame left to work in his company's branch in Japan, he < a special trainning program"],
                "clude" : []
               
            },
            {
                "qid":"04",
                "completed":true,
                "file": {"id": "01", "src":null},
                "categories":"Fill in blank",
                "type" : "input",
                "question" :["James is moving to a new neighorhood, but her friends hope she will <"],
                "clude" : []
               
            },
         
      
           
            
        ]
        
    },
    
  {
        "id":"05",
        "type" : "MQC",
        "progress" : 100,
        "task" : false,
        'name' : "Listening",
        "question" : [
            {
                "qid":"1",
                "completed":true,
                "type":"checkbox",
                "file": {"id": "01", "src":" https://www.123listening.com/freeaudio/adjectives1-1.mp3"},
                "categories": "multiple Chocice",
                "question":["what is the capital of Uruguay is _____?"],
                "clude":[
                    {"id":"01", "choice":"Montery","isCorrect":true,  "selected": false },
                    {"id":"02", "choice":"New Uruguay","isCorrect":false,"selected": false  },
                    {"id":"03", "choice":"Motevideo","isCorrect":false,"selected": false },
                    {"id":"04", "choice":"Panama City","isCorrect": false,"selected": false  }
                ]
            
            },
            {
        
                "qid":"2",
                "completed":true,
                "type":"checkbox",
                "categories": "multiple Chocice",
                "file": {"id": "01", "src": null},
                "question":["The examination of every human social interaction on a small scale describes______?"],
                "clude":[
                    {"id":"01", "choice":"functionalism","selected": false },
                    {"id":"02", "choice":"macrosociology","selected": false },
                    {"id":"03", "choice":"cultural anthropology" ,"selected": false},
                    {"id":"04", "choice":"microsociology","selected": false }
                ]
            
            },
    
    
            {
                "qid":"3",
                "type":"checkbox",
                "completed":true,
                "categories": "multiple Chocice",
                "file": {"id": "01", "src": "https://www.123listening.com/freeaudio/bodyparts1-2.mp3"},
                "question":["Karl is upset because______?"],
                "clude":[
                    {"id":"01", "choice":"his application are due","selected": false },
                    {"id":"02", "choice":"his train was dlayed" ,"selected": false},
                    {"id":"03", "choice":"he was late getting to school" ,"selected": false},
                    {"id":"04", "choice":"he was late getting to school" ,"selected": false},
                    
                ]
    
            },
        ],
    
       
    }

]






















module.exports = {quiz}