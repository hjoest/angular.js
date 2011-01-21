describe('buzz client', function(){
  beforeEach(function(){
    browser().navigateTo('buzz.html');
  });

  it('should startup empty', function(){
    expect(element('[name=userId]').val()).toEqual('');
    expect(element('[name=filterText]').val()).toEqual('');
    //expect(repeater('body>ul>li').count()).toEqual(0);
  });

  describe('bradlygreen', function(){

    beforeEach(function(){
      input('userId').enter('bradlygreen');
      element(':button').click();
    });

    it('should load data', function(){
      expect(repeater('body>ul>li').count()).toBeGreaterThan(0);
      expect(browser().location().hashPath()).toEqual('bradlygreen');
    });

    it('should filter result set', function(){
      input('filterText').enter('Bees');
      expect(repeater('body>ul>li').count()).toEqual(1);
    });

    it('should expand replies', function(){
      input('filterText').enter('Bees');
      element("a:contains('Replies: 3')").click();
      var replies = repeater('body>ul>li ul>li');
      expect(replies.count()).toEqual(3);
      expect(replies.row(2)).toEqual([
        "mark mckay",
        "Fun! we&amp;#39;ll have those with the goats then! do bees have very large talons?"]);
    });

  });

  describe('miskohevery', function(){
    beforeEach(function(){
      browser().navigateTo('buzz.html#miskohevery');
    });

    it('should load data', function(){
      expect(repeater('body>ul>li').count()).toBeGreaterThan(0);
      expect(browser().location().hashPath()).toEqual('miskohevery');
    });

  });

});
