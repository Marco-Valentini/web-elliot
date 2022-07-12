//prendo oggetto della select
const select = document.getElementById('loading_strategy');
//gestione checkbox
const global_threshold_check = document.getElementById('global_threshold');
const user_average_check = document.getElementById('user_average');
const user_k_core_check = document.getElementById('user_k_core');
const item_k_core_check = document.getElementById('item_k_core');
const iterative_k_core_check = document.getElementById('iterative_k_core');
const n_rounds_k_core_check = document.getElementById('n_rounds_k_core');
const cold_users_check = document.getElementById('cold_users');

//gestione dei radio button per lo splitting
const test_fixed_timestamp_radio = document.getElementById('test_fixed_timestamp');
const test_temporal_hold_out_radio = document.getElementById('test_temporal_hold_out');
const test_random_subsampling_radio = document.getElementById('test_random_subsampling');
const test_random_cross_validation_radio = document.getElementById('test_random_cross_validation');
const validation_fixed_timestamp_radio = document.getElementById('validation_fixed_timestamp');
const validation_temporal_hold_out_radio = document.getElementById('validation_temporal_hold_out');
const validation_random_subsampling_radio = document.getElementById('validation_random_subsampling');
const validation_random_cross_validation_radio = document.getElementById('validation_random_cross_validation');

//gestione degli input dei files
const dataset_file =document.getElementById('dataset');
const train_file =document.getElementById('train_file');
const validation_file =document.getElementById('validation_file');
const test_file =document.getElementById('test_file');
const dataset_folder = document.getElementById('dataset_folder');

//gestione preprocessing buttons
const dataset_button = document.getElementById('dataset_button');
const fixed_button = document.getElementById('fixed_button');
const hierarchy_button = document.getElementById('hierarchy_button');


//gestione per far comparire/scomparire i vari pezzi di prefiltering e splitting
const prefiltering_button = document.getElementById('prefiltering_button');
const prefiltering_block = document.getElementById('prefiltering_block');

prefiltering_button.addEventListener('click',() => {
prefiltering_block.hidden = false})

const test_splitting_button = document.getElementById('test_splitting_button');
const test_splitting = document.getElementById('test_splitting');

test_splitting_button.addEventListener('click',() => {
test_splitting.hidden = false})

const validation_splitting_button = document.getElementById('validation_splitting_button');
const validation_splitting = document.getElementById('validation_splitting');

validation_splitting_button.addEventListener('click',() => {
validation_splitting.hidden = false})

//gestione strategie di caricamento
select.addEventListener('change', (event) => {
event.preventDefault();

if (select.value === 'dataset') {
    test_fixed_timestamp_radio.required = true;
    test_temporal_hold_out_radio.required = true;
    test_random_subsampling_radio.required = true;
    test_random_cross_validation_radio.required = true;
    dataset_button.disabled = false;
    dataset_file.disabled = false;
    dataset_file.required = true;
    train_file.disabled = true;
    validation_file.disabled = true;
    test_file.disabled = true;
    fixed_button.disabled = true;
    dataset_folder.disabled = true;
    hierarchy_button.disabled = true;
    //riattivo checkbox e radio in caso di strategia dataset
    global_threshold_check.disabled = false;
    user_average_check.disabled = false;
    user_k_core_check.disabled = false;
    item_k_core_check.disabled = false;
    iterative_k_core_check.disabled = false;
    n_rounds_k_core_check.disabled = false;
    cold_users_check.disabled = false;
    test_fixed_timestamp_radio.disabled = false;
    test_temporal_hold_out_radio.disabled = false;
    test_random_subsampling_radio.disabled = false;
    test_random_cross_validation_radio.disabled = false;
    validation_fixed_timestamp_radio.disabled = false;
    validation_temporal_hold_out_radio.disabled = false;
    validation_random_subsampling_radio.disabled = false;
    validation_random_cross_validation_radio.disabled = false;
}

if (select.value === 'fixed') {
    dataset_file.disabled = true;
    dataset_button.disabled = true;
    train_file.disabled = false;
    test_file.disabled = false;
    validation_file.disabled = false;
    fixed_button.disabled = false;
    train_file.required = true;
    test_file.required = true;
    dataset_folder.disabled = true;
    hierarchy_button.disabled = true;

//disattivo le checkbox e i radio di prefiltering e splitting

   global_threshold_check.disabled = true;
    user_average_check.disabled = true;
    user_k_core_check.disabled = true;
    item_k_core_check.disabled = true;
    iterative_k_core_check.disabled = true;
    n_rounds_k_core_check.disabled = true;
    cold_users_check.disabled = true;
    test_fixed_timestamp_radio.disabled = true;
    test_temporal_hold_out_radio.disabled = true;
    test_random_subsampling_radio.disabled = true;
    test_random_cross_validation_radio.disabled = true;
    validation_fixed_timestamp_radio.disabled = true;
    validation_temporal_hold_out_radio.disabled = true;
    validation_random_subsampling_radio.disabled = true;
    validation_random_cross_validation_radio.disabled = true;
}

if (select.value === 'hierarchy') {

    dataset_file.disabled = true;
    dataset_button.disabled = true;
    train_file.disabled = true;
    validation_file.disabled = true;
    test_file.disabled = true;
    fixed_button.disabled = true;
    hierarchy_button.disabled = false;
    dataset_folder.disabled = false;
    dataset_folder.required = true;

    //disattivo le checkbox e i radio di prefiltering e splitting

    global_threshold_check.disabled = true;
    user_average_check.disabled = true;
    user_k_core_check.disabled = true;
    item_k_core_check.disabled = true;
    iterative_k_core_check.disabled = true;
    n_rounds_k_core_check.disabled = true;
    cold_users_check.disabled = true;
    test_fixed_timestamp_radio.disabled = true;
    test_temporal_hold_out_radio.disabled = true;
    test_random_subsampling_radio.disabled = true;
    test_random_cross_validation_radio.disabled = true;
    validation_fixed_timestamp_radio.disabled = true;
    validation_temporal_hold_out_radio.disabled = true;
    validation_random_subsampling_radio.disabled = true;
    validation_random_cross_validation_radio.disabled = true;
}
})

//gestione delle checkbox
/*const global_threshold_check = document.getElementById('global_threshold');
// const user_average_check = document.getElementById('user_average'); non serve
const user_k_core_check = document.getElementById('user_k_core');
const item_k_core_check = document.getElementById('item_k_core');
const iterative_k_core_check = document.getElementById('iterative_k_core');
const n_rounds_k_core_check = document.getElementById('n_rounds_k_core');
const cold_users_check = document.getElementById('cold_users');*/

//gestione delle text associate alle checkbox

const global_threshold_threshold = document.getElementById('global_threshold_threshold');

global_threshold_check.addEventListener('click',()=>{
    show_text_check(global_threshold_threshold);
})

const user_k_core_core = document.getElementById('user_k_core_core');

user_k_core_check.addEventListener('click',()=>{
    show_text_check(user_k_core_core);
})

const item_k_core_core = document.getElementById('item_k_core_core');

item_k_core_check.addEventListener('click',()=>{
    show_text_check(item_k_core_core);
})

const iterative_k_core_core = document.getElementById('iterative_k_core_core');

iterative_k_core_check.addEventListener('click',()=>{
    show_text_check(iterative_k_core_core);
})

const n_rounds_k_core_core = document.getElementById('n_rounds_k_core_core');
const n_rounds_k_core_rounds = document.getElementById('n_rounds_k_core_rounds');


n_rounds_k_core_check.addEventListener('click',()=>{
    show_text_check(n_rounds_k_core_core);
    show_text_check(n_rounds_k_core_rounds);
})

const cold_users_threshold = document.getElementById('cold_users_threshold');

cold_users_check.addEventListener('click',()=>{
    show_text_check(cold_users_threshold);
})

function show_text_check(ogg){
if (ogg.hidden === true){
    ogg.hidden = false;
    ogg.required = true;}
    else {
    ogg.hidden = true;
    ogg.required = false;}}

    //gestione text associate ai radio
const test_fixed_timestamp_value = document.getElementById('test_fixed_timestamp_value');

test_fixed_timestamp_radio.addEventListener('change', () => {
    show_text(test_fixed_timestamp_value);
})

const test_temporal_hold_out_test_ratio = document.getElementById('test_temporal_hold_out_test_ratio');
const test_temporal_hold_out_leave_n_out = document.getElementById('test_temporal_hold_out_leave_n_out');

test_temporal_hold_out_radio.addEventListener('change', () => {
    show_text(test_temporal_hold_out_test_ratio);
    show_text(test_temporal_hold_out_leave_n_out);
})

const test_random_subsampling_test_ratio = document.getElementById('test_random_subsampling_test_ratio');
const test_random_subsampling_leave_n_out = document.getElementById('test_random_subsampling_leave_n_out');
const test_random_subsampling_folds = document.getElementById('test_random_subsampling_folds');

test_random_subsampling_radio.addEventListener('change', () => {
    show_text(test_random_subsampling_test_ratio);
    show_text(test_random_subsampling_leave_n_out);
    show_text(test_random_subsampling_folds);
})
// a tempo perso gestire che se sceglie uno dei due parametri l'altra casella viene disabilitata

const test_random_cross_validation_folds = document.getElementById('test_random_cross_validation_folds');

test_random_cross_validation_radio.addEventListener('change', () => {
    show_text(test_random_cross_validation_folds);
})
function show_text(ogg){
if (ogg.hidden === true){
    ogg.hidden = false;}}

    //gestione text associate ai radio nella validation
const validation_fixed_timestamp_value = document.getElementById('validation_fixed_timestamp_value');

validation_fixed_timestamp_radio.addEventListener('change', () => {
    show_text(validation_fixed_timestamp_value);
})

const validation_temporal_hold_out_test_ratio = document.getElementById('validation_temporal_hold_out_test_ratio');
const validation_temporal_hold_out_leave_n_out = document.getElementById('validation_temporal_hold_out_leave_n_out');

validation_temporal_hold_out_radio.addEventListener('change', () => {
    show_text(validation_temporal_hold_out_test_ratio);
    show_text(validation_temporal_hold_out_leave_n_out);
})

const validation_random_subsampling_test_ratio = document.getElementById('validation_random_subsampling_test_ratio');
const validation_random_subsampling_leave_n_out = document.getElementById('validation_random_subsampling_leave_n_out');
const validation_random_subsampling_folds = document.getElementById('validation_random_subsampling_folds');

validation_random_subsampling_radio.addEventListener('change', () => {
    show_text(validation_random_subsampling_test_ratio);
    show_text(validation_random_subsampling_leave_n_out);
    show_text(validation_random_subsampling_folds);
})
// a tempo perso gestire che se sceglie uno dei due parametri l'altra casella viene disabilitata

const validation_random_cross_validation_folds = document.getElementById('validation_random_cross_validation_folds');

validation_random_cross_validation_radio.addEventListener('change', () => {
    show_text(validation_random_cross_validation_folds);
})