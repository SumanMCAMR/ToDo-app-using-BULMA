$(function () {
    $('#main-form').parsley();
  
    let taskData = [];
    let taskID = 0;
  
    function renderTasks() {
        let showCompleted = $("#completed-checkbox").is(":checked");
        $('#task-list').empty();
      
        taskData.forEach(function (task) {
          if (showCompleted) {
            if (task.status === "complete") {
              let row = $("<tr>");
              let cell1 = $("<td>").text(task.name);
              let cell2 = $("<td>").text(task.task);
              let cell3 = $("<td>");
      
              let checkbox = $("<input>")
                .attr("type", "checkbox")
                .attr("disabled", true)
                .prop("checked", true);
      
              cell3.append(checkbox);
      
              let cell4 = $("<td>");
              let deleteButton = $("<button>")
                .addClass("delete-button")
                .text("Delete")
                .on("click", function () {
                  alertify.confirm(
                    "Delete Decision",
                    "Do you really want to delete the selected task ?",
                    function () {
                      alertify.success("Deleted Successfully");
                      let index = $(deleteButton).closest("tr").remove();
                      taskData.splice(index, 1);
                    },
                    function () {
                      alertify.error("Cancelled: Good Decision");
                    }
                  );
                });
      
              cell4.append(deleteButton);
              row.append(cell1, cell2, cell3, cell4);
              $("#task-list").append(row);
            }
          } else {
            let row = $("<tr>");
            let cell1 = $("<td>").text(task.name);
            let cell2 = $("<td>").text(task.task);
            let cell3 = $("<td>");
      
            let checkbox = $("<input>")
              .attr("type", "checkbox")
              .on("change", function () {
                if (this.checked) {
                  task.status = "complete";
                } else {
                  task.status = "incomplete";
                }
              });
      
            if (task.status === "complete") {
              checkbox.prop("checked", true);
            }
      
            cell3.append(checkbox);
      
            let cell4 = $("<td>");
            let deleteButton = $("<button>")
              .addClass("delete-button")
              .text("Delete")
              .on("click", function () {
                alertify.confirm(
                  "Delete Decision",
                  "Do you really want to delete the selected task ?",
                  function () {
                    alertify.success("Deleted Successfully");
                    let index = $(deleteButton).closest("tr").remove();
                    taskData.splice(index, 1);
                  },
                  function () {
                    alertify.error("Cancelled: Good Decision");
                  }
                );
              });
      
            cell4.append(deleteButton);
            row.append(cell1, cell2, cell3, cell4);
            $("#task-list").append(row);
          }
        });
      }
      
      
  
    $('#saveButton').click(function () {
      let name = $('#name').val().trim();
      let task = $('#description').val().trim();
      let status = "incomplete";
  
      if (name !== "" && task !== "") {
        taskData.push({ id: taskID, name: name, task: task, status: status });
        taskID++;
        renderTasks();
        $('#name').val("");
        $('#description').val("");
      }
      clearField();
    });
  
    $("#completed-checkbox").on("change", renderTasks);
  
    function clearField() {
      $('#main-form').each(function () {
        this.reset();
      });
    }
  });
  