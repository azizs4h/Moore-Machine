var i=0,b=0,a=0;
var addTable="";
var addInput = [],searchWord=[],transitionState = [];
var stateArray=[],transitionArray=[];
var afterState=[];
var result=[],tablediv="";
var output="",transition = [];

function setTable(){
    if(check()){
        instring = document.getElementById('search').value;
        for(i=0;i<instring.length;i++){
            searchWord[i]=instring.charAt(i);
        }
        stateArray=document.getElementById('state').value;
            stateArray = stateArray.split(',');
        transitionArray=document.getElementById('transition').value;
            transitionArray = transitionArray.split(',');
        tablediv = document.getElementById('tablediv');
        tablediv.innerHTML += "<table class='table' id='stateTable'></table>";
        var table = document.getElementById('stateTable');
        addTable += "<tr><th>Old State</th>";
        for( i=0 ; i < stateArray.length*(transitionArray.length+1);i++ ){
            addInput[i]="<td><input id='"+i+"' class = 'tableinput' placeholder='After State'  type='text'></td>";    
        }
        for( i=0 ; i < transitionArray.length ; i++ ){
            addTable += "<th>After input "+transitionArray[i]+"</th>";
        }
        addTable += "<th>Output</th></tr>";
        a=0;
        for( i=0 ; i < stateArray.length ; i++ ){
            addTable += "<tr><td>"+stateArray[i]+"</td>";
            for( j=0 ; j < transitionArray.length+1 ; j++ ){
                addTable += addInput[a];
                a++;
            }
            addTable += "</tr>";
        }
        table.innerHTML+=addTable;
        document.getElementById('confirm').disabled=true;
    }
    else
        alert("There are empty spaces !");

}

function mooreCalc(){
    if(check()){
        getInput();
        while(afterState.length) transition.push(afterState.splice(0,transitionArray.length));
        result=[];
        result[0]=stateArray[0];
        a=0;
        sindex=1;
        for(i=0;i<searchWord.length;i++){
            for(j=0;j<transitionArray.length;j++){
                if(searchWord[i]==transitionArray[j]){
                    result[sindex]=transition[a][j];
                    
                    if(stateArray[a]!=transition[a][j]){
                        a=stateArray.indexOf(transition[a][j]);
                    }
                    sindex++;
                }
            }
        }
        output="";
        for(i=0;i<result.length;i++){
            for(j=0;j<stateArray.length;j++){
                if(result[i]==stateArray[j]){
                    output+=transitionState[j];
                }
            }
        }
        document.getElementById('resultdiv').innerHTML+="States : "+result;
        document.getElementById('outputdiv').innerHTML+="Results : "+output;
        document.getElementById('calculate').disabled=true;
   }
    else
        alert("There are empty spaces !");
}

function getInput(){
    var oindex=0,b=0,selOutput=transitionArray.length;
    for(i=0;i<stateArray.length*(transitionArray.length+1);i++){
        if(i==selOutput){
            transitionState[oindex]=document.getElementById(i).value;
            oindex++;
            selOutput+=transitionArray.length+1;
        }
        else{
            afterState[b]=document.getElementById(i).value;
            b++;
        }
    }
}

function clearAll(){
    tablediv.innerHTML="";
    i,b=0,a=0;
    addTable="";
    addInput = [];
    stateArray,transitionArray;
    searchWord=[];
    transitionState = [];
    afterState=[];
    result=[];
    output;
    document.getElementById('search').value = "";
    document.getElementById('state').value = "";
    document.getElementById('transition').value = "";
    document.getElementById('resultdiv').innerHTML = "";
    document.getElementById('outputdiv').innerHTML = "";
    document.getElementById('calculate').disabled = false;
    document.getElementById('confirm').disabled = false;
}

function check(){
    if(document.getElementById('state').value==""&&document.getElementById('transition').value==""&&document.getElementById('search').value=="")
        return false;
    else
        return true;
}
