var inputCount = 1;

$(".fa-plus-circle").on("click", function() {
    if(inputCount === 1) {
        $(".fa-minus-circle").fadeToggle();
    }
    $(this).animate({fontSize: '70px'});
    $(this).animate({fontSize: '30px'});
    $('<div class="form-group"><label for="exercises">Exercise ' + (inputCount + 1) + '</label><input class="form-control" type="text" name="exercises" placeholder="name" maxlength="30" required></div><div class="form-group"><label for="sets">Sets</label><input class="form-control" type="number" name="sets" placeholder="sets" min="1" step="1" required></div><div class="form-group"><label for="reps">Reps</label><input class="form-control" type="text" name="reps" placeholder="reps" required></div>').insertAfter("form div:nth-last-of-type(3)");
    inputCount++;
});


$(".fa-minus-circle").on("click", function() {
    if(inputCount > 1) {
        $(this).animate({fontSize: '10px'});
        $(this).animate({fontSize: '30px'});
        $("form div:nth-last-of-type(3)").remove();
        $("form div:nth-last-of-type(3)").remove();
        $("form div:nth-last-of-type(3)").remove();
        inputCount--;
    } 
    if (inputCount === 1) {
        $(this).fadeToggle();
    }
});