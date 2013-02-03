$(window).load(function(){
		  $('div' + '.amebloGist').each(function(){
		    var param = $(this).attr('id');
		    if(param && param.match(/^[0-9]*$/)){
            	var giturl = 'https://gist.github.com/'+param+'.json'
	            $.ajax({
	                url: giturl,
	                type: 'GET',
	                dataType: 'jsonp'
	              }).success(function(gistdata) {
	              	$('<link />',{
	              		'media':'screen',
	              		'rel':'stylesheet',
	              		'href':gistdata.stylesheet
	              	}).appendTo('head');
                     	$('#'+param).html(gistdata.div)
          	 		 
	              }).error(function() {
	            	 alert("error") 
	              });
		    }else{
		      notice(param, "Illigal parameter.");
		    }
		  });
		});
