const buttonStatus = document.querySelectorAll("[button-status]");
// console.log(buttonStatus);
if (buttonStatus.length > 0) {
    // khai báo set url mới
    let url = new URL(window.location.href)
    console.log(url);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            // console.log(status);

            if (status) {

                url.searchParams.delete("page"); // sai thì sửa ở đây
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            };
            console.log(url.href);
            // chuyển hướng url mới
            window.location.href = url.href;
        });
    });
}


// end bo loc trang thai

const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(e);
        // lấy ra được từ khóa tìm kiếm
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        };
        window.location.href = url.href;

    })
}

//end tim kiem

const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })

    })
}

// end phan trang



const checkboxMulti = document.querySelector("[checkbox-multi]");
// console.log(checkboxMulti);
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    // console.log(inputCheckAll);
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");
    // console.log(inputsId);
    inputCheckAll.addEventListener("click", () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })

        }
    });
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked")
            // console.log(countChecked);
            if (countChecked.length == inputsId.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }
        })
    })
}


const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputChecked);


        //xoa tat ca
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isConfirm = confirm("chac khong")
            if (!isConfirm) {
                return;
            }
        }
        //


        if (inputChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']")

            inputChecked.forEach(input => {
                const id = input.value;
                // console.log(id);
                // console.log(input);
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    // console.log(position);
                    ids.push(`${id}-${position}`);
                   
                    
                    
                }else{
                    ids.push(id);
                }
               

                //vi o input chi luu duoc dang text khong luu dc dang mang nen phai chuyen ve dang text



            });
            // console.log(  ids.join(", "));
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {

        }
    });
}



// end checkbox


//show alert
const showAlert= document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")

    },time)
}





