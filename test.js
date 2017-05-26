var fs = require('fs');
var jsonfile = require('jsonfile');

var file = 'data.json';


fs.readFile('movie_metadata.csv','utf8', function (err, file) {
  if (err) throw err;
  var st = String(file);
  var lines = st.split("\n");
  var count = lines.length;
  var row=[];
  for(var i=0;i<count;i++){
    row.push(lines[i].split(","));
  }
  //var row = lines[0].split(",");
  //console.log(row[1][3]);
  app(row);
});
var data = [];

function addEntry(a,b,c,d,e){

  data.push({
  movie_name: a,
  movie_duration: b,
  movie_genre: c,
  movie_likes: d,
  movie_year: e
  });
//console.log(data);
}

function app(row){
  var count = row.length;
  //var min = 0;


  for(var i = 1;i<count-1; i++){
    // console.log(row[i][11]+row[i][3]+row[i][9]+row[i][27]);
    addEntry(row[i][11],row[i][3],row[i][9],row[i][27].replace(/\r/,""),row[i][23]);



  }
  var lessThan150 = durationLess150(data);

  var groupByGenre = group(data);

  var list = {};
  for(var g in groupByGenre){
    list[g] = groupByGenre[g].length;
  }
  //console.log("List with no. of movies in Specific Genres");
  //console.log(typeof groupByGenre);
  var like = maxFacebookLike(groupByGenre);
  var groupByYear = groupYear(groupByGenre);
  //console.log(groupByYear);
  //console.log(groupByGenre);
  var final = {};
  /// It could be movies list but since the list is huge I am returning only the overall number.
  final['No. of Movies with duration less than 150'] = lessThan150;
  final['Number of Movie in each group genre'] = list;
  final['Facebook likes'] = like;
  final['Year-wise grouping'] = groupByYear;
  console.log(final);
  jsonfile.writeFile(file, final, {spaces: 2}, function(err) {
    console.error(err)
  })
}

// 5 Movies with maximum Facebook likes in Documentary
function maxFacebookLike(data){
  var temp = data['Documentary'];
  //console.log(temp);
  var like = [];
  var max,index,m,n;
  for(i=0;i<5;i++){
    max = temp.reduce(function(a,cur){
    //  m = cur.movie_likes.replace(/\r/,"");
      //n = a.movie_likes.replace(/\r/,"");
      //console.log(cur.movie_likes);

      //if(m != null){
      if(cur.movie_likes > a.movie_likes)
        return cur;
      else {
        return a;
      }
    //}

    });
    //console.log("Movies with Max Facebook Likes");
    //console.log(max);
    like.push(max);
    index = temp.indexOf(max);
    if(index > -1){
      temp.splice(index,1);
    }
  }
  return like;
  //console.log(like);
}

// List of Movies YOY with specific genres

function groupYear(data){
  //var groups = {};
  var yoy = {};

  for(var group in data){
    var y = {};
    var g = data[group];
    //console.log(g);
    g.forEach(function(element){
      var year = element.movie_year;
      if(year in y){
        y[year].push(element);
      }
      else {
        y[year] = [element];
      }
    });

    yoy[group] = y;
  }
  return yoy;
  //return groups;
}
//
var groups = {};
// Grouping on the basis of specific genres
function group(data){
  var c=0;
  data.forEach(function(element){
    var groupName = element.movie_genre;
    if(groupName in groups)
      groups[groupName].push(element);
    else {
      groups[groupName] = [element];
      c+=1;
    }
  });
//  console.log("Total No. of different genres = " + c);
  //console.log(groups['Thriller'].length);
  return groups;
}

// Movies with less Duration than 150
function durationLess150(data){
  var a=[];
  for(var i=0;i<data.length;i++)
  {
    if(data[i].movie_duration<150)
      a.push(data[i]);
  }
//  console.log(a.length);
  return a.length;
}




//console.log(data.length);
