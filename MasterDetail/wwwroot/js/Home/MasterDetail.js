var selectedInfoIndex = -1;

var divContainerSelector = "#PersonInfo";
var divItemsSelector = ".PersonInfo_Item";

var modalInfoPerson = "#exampleModalCenter";

window.onload = function () {
    $(modalInfoPerson).on('hide.bs.modal', function (e) {
        ClearModalInfo(modalInfoPerson);
    })
};

function AddInfo() {
    if (this.selectedInfoIndex < 0) {
        var url = document.getElementById("urlAddDetail").href;
        var data = {
            PersonInfoId: 0,
            PersonId: 0,
            Level: $("#modalLevel").val(),
            SchoolName: $("#modalSchool").val(),
            Year: $("#modalYear").val()
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (returnval) {
                $("#PersonInfo").append(returnval);
                CloseModal(modalInfoPerson);
                ClearModalInfo(modalInfoPerson);
                RenameElementNames(divContainerSelector, divItemsSelector);
            },
            error: function (returnval) {
                console.warn("Error: ", returnval);
            }
        });
    } else {
        var context = $(divItemsSelector + ":nth-child(" + (this.selectedInfoIndex + 1) + ")");

        $('input[name$=Level],select[name$=Level]', context).val($(modalInfoPerson + " #modalLevel").val());
        $('input[name$=SchoolName]', context).val($(modalInfoPerson + " #modalSchool").val());
        $('input[name$=Year]', context).val($(modalInfoPerson + " #modalYear").val());

        CloseModal(modalInfoPerson);
        ClearModalInfo(modalInfoPerson);

        $(context).closest('form').submit();
    }
}

function ClearModalInfo(selector) {
    this.selectedInfoIndex = -1;
    $(modalInfoPerson + " #exampleModalLongTitle").html("Agregar información");
    $(selector + ' input[type="text"],textarea').val("");
    $(selector + " select").val(-1);
    $(selector + ' input[type="radio"]').prop('checked', false);
}

function ShowModal(selector) {
    $(selector).modal('show');
}

function CloseModal(selector) {
    $(selector).modal('hide');
}

function EditInfo(context) {
    context = $(context).closest(divItemsSelector);
    var index = $(context).find("#_index_").val();
    this.selectedInfoIndex = parseInt(index);
    context = $(divItemsSelector + ":nth-child(" + (index + 1) + ")");
    $(modalInfoPerson + " #exampleModalLongTitle").html("Editar información");
    $(modalInfoPerson + " #modalLevel").val(document.getElementsByName("[" + index + "].Level")[0].value);
    $(modalInfoPerson + " #modalSchool").val(document.getElementsByName("[" + index + "].SchoolName")[0].value);
    $(modalInfoPerson + " #modalYear").val(document.getElementsByName("[" + index + "].Year")[0].value);
    ShowModal(modalInfoPerson);
}

function RemoveInfo(context) {
    $(context).closest(divItemsSelector).remove();
    RenameElementNames(divContainerSelector, divItemsSelector);
}

/**
 * Renombra los nombres de los elementos a partir de su valor en data-name, por ejemplo:
 * De:
 * name="[0].Nombre" data-name="name"  ->  name="[0].Nombre" data-name="name"
 * name="[0].Nombre" data-name="name"  ->  name="[1].Nombre" data-name="name"
 * name="[0].Nombre" data-name="name"  ->  name="[2].Nombre" data-name="name"
 * @param {string} divContainerSelector Selector del elemento padre
 * @param {string} divItemsSelector     Selector del elemento que contiene a los input, select etc...
 */
function RenameElementNames(divContainerSelector, divItemsSelector) {
    var elementsCount = $(divContainerSelector + " " + divItemsSelector).length;

    $(divContainerSelector + " " + divItemsSelector).each(function (index, item) {
        //Input
        $("input", item).each(function (indexInput, itemInput) {
            if (itemInput.dataset.name != null) {
                itemInput.name = "[" + index + "]." + itemInput.dataset.name;
            }
        });
    });
}

function onBegin(evt) {
    console.log("onBegin", evt);
    return true;//true to execute the submit, false otherwise
};

var onComplete = function () {
    //console.log("onComplete");
};

var onSuccess = function (context) {
    $("#PersonInfo").html(context);
};

var onFailed = function (context) {
    console.warn("onFailed", context);
};
