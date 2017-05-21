(function() {
    var button = document.querySelector('button'),
    http = document.querySelector('select[name=http]'),
    releases = document.querySelector('select[name=releases]'),
    list = document.querySelector('textarea[name=list]'),
    src = document.querySelector('input[name=src]'),
    contrib = document.querySelector('input[name=contrib]'),
    backports = document.querySelector('input[name=backports]');
	proposed = document.querySelector('input[name=proposed]');
	security = document.querySelector('input[name=security]');
	//创建个数组
    var sourceList = [];
	
	//没看懂,应该是初始化的东西吧
    var getComponents = function() {
        var components = ['main'];

		//默认添加这些玩意
        components.push('restricted universe multiverse');
		
		//没看懂
        return components.join(' ');
    };

//很重要不能动
    var appendSource = function(source) {
        sourceList.push(source.filter(function(element) {
            return element.length;
        }).join(' '));
    };

	
	//生成配置文件
    var generate = function() {
        var ftp = http.options[http.selectedIndex].value,
        rel = releases.options[releases.selectedIndex].value;

        var comps = getComponents();

        appendSource(['deb', , ftp, rel, comps]);
		
		//包含源码的checkbox
        if (src.checked) appendSource(['deb-src', , ftp, rel, comps]);

        if (releases.options[releases.selectedIndex].hasAttribute('data-updates')) {
            appendSource(['']);
            appendSource(['deb', , ftp, rel + '-updates', comps]);
            if (src.checked) 
				appendSource(['deb-src', , ftp, rel + '-updates', comps]);
        }
	//add backports
        if (backports.checked) {
            appendSource(['']);
            appendSource(['deb', ftp, rel + '-backports', comps]);
            if (src.checked) 
				appendSource(['deb-src',ftp , rel + '-backports', comps]);
        }
	//add proposed
		if(proposed.checked) {
			appendSource(['']);
			
			appendSource(['deb', ftp, rel + '-proposed', comps]);
		
			if(src.checked)
				appendSource(['deb-src',ftp , rel + '-proposed', comps]);
		}
		
		
		//add security
		if(security.checked) {
			appendSource(['']);
			
			appendSource(['deb', ftp, rel + '-security', comps]);
		
			if(src.checked)
				appendSource(['deb-src',ftp , rel + '-security', comps]);
		}
		
		
        list.value = sourceList.join("\n");
        sourceList = [];
    };
	
	
	http.addEventListener('change', generate, false);
	releases.addEventListener('change',generate,false);
	src.addEventListener('change',generate,false);
	backports.addEventListener('change',generate,false);
	proposed.addEventListener('change',generate,false);
	security.addEventListener('change',generate,false);
    generate();
})();