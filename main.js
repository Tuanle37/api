var listCoursesBlock =document.querySelector('#list-courses')

var courseApi ='http://localhost:3000/courses'

function start(){
    getCourses(renderCourses);

    handelCreateForm();
    handelDeleteForm();
}

start();


//funtions


function getCourses(callback){
    fetch(courseApi)
        .then(function(reponse){
            return reponse.json();
        })
        .then(callback);
}

function createCourrse(data,callback){
    options={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    fetch(courseApi,options)
        .then(function(reponse){
            reponse.json()
        })
        .then(callback)
}

function handelDeleteForm(id){
    options={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
     
    }
    fetch(courseApi+'/'+id,options)
        .then(function(reponse){
            reponse.json()
        })
        .then(function(){
            var courseItem =document.querySelector('.course-item-'+id)
            if (courseItem)
            {
                courseItem.remove();
            }

        })
    }

function renderCourses(courses){
    var htmls= courses.map(function(course){
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handelDeleteForm(${course.id})">xóa</button>
            </li>
        `
    })

    listCoursesBlock.innerHTML= htmls.join('')
}

function handelCreateForm(){
    var createBtn =document.querySelector('#create')
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value
        var formData= {
            name:name,
            description:description
        }
        createCourrse(formData,function(){
            getCourses(renderCourses)
        });
        
    }
}




// var users = [
//     {
//         id: 1,
//         name: 'kiem dam',
//     },
//     {
//         id: 2,
//         name: 'Son Dang',
//     },
//     {
//         id: 3,
//         name: 'Tuan Le',
//     }
// ];
// var comments =[
//     {
//         id:1,
//         user_id: 1,
//         content:'Anh Son chua ra video :('
//     },
//     {
//         id:2,
//         user_id: 2,
//         content:'Vua ra xong em oi!'
//     }
// ];

// //1. Lấy comment
// //2. Từ comment lấy ra user_id,
// // từ user_id lấy ra user tương đương

// //fake API

// function getComments(){
//     return new Promise (function(resolve){
//         setTimeout(function(){
//             resolve(comments);
//         },1000);
//     });
// }

// function getUserByIds(userIds){
//         return new Promise(function(resolve) {
//             var result= users.filter(function(user){
//                 return userIds.includes(user.id)
//             });
//             resolve(result);
//         });
// }


// getComments()
//     .then(function(comments){
//         var userIds= comments.map(function(comment){
//             return comment.user_id;
//         });
//            return getUserByIds([1,2])
//             .then(function(users){
//                  return{
//                     users:users,
//                     comments:comments,
//                  };
//              });
//     })
//     .then(function(data){
//        var commentblock=document.getElementById('comment-block')
//        var html='';
//        data.comments.forEach(function(comment) {
//            var user = data.users.find(function(user){
//                return user.id === comment.user_id;
//            })
//            html+=`<li>${user.name}: ${comment.content}</li> `
//        });

//        commentblock.innerHTML = html;
//     });

// var courseApi ='http://localhost:3000/courses'

// fetch(courseApi)
// .then(function(reponse){
//     return reponse.json();
// })
// .then(function(course){
//     console.log(course)
// })