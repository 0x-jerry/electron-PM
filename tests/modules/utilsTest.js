require('chai').should()
const utils = require('../../app/main/modules/utils.js')

describe('module utils test', () => {
  describe('caml case to underscore test', () => {
    it('should return tag when given tag', () => {
      const name = utils.camelCaseToUnderscore('tag')
      name.should.be.equal('tag')
    })

    it('should return tag_id when given tagId', () => {
      const name = utils.camelCaseToUnderscore('tagId')
      name.should.be.equal('tag_id')
    })
  })

  describe('add compose test', () => {
    it('should return sql string', () => {
      const sqlStrs = utils.composeInsertExecString('tags', [
        'num',
        'str',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        INSERT INTO tags(num,str)
        VALUES(@num,@str)
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })

    it('should return sql string with camel case style', () => {
      const sqlStrs = utils.composeInsertExecString('tags', [
        'numId',
        'strId',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        INSERT INTO tags(num_id,str_id)
        VALUES(@numId,@strId)
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })
  })

  describe('delete compose test', () => {
    it('should return sql string', () => {
      const sqlStrs = utils.composeDeleteExecString('tags', [
        'num',
        'str',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        DELETE FROM tags
        WHERE num=@num AND str=@str
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })

    it('should return sql string with camel case style', () => {
      const sqlStrs = utils.composeDeleteExecString('tags', [
        'numId',
        'strId',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        DELETE FROM tags
        WHERE num_id=@numId AND str_id=@strId
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })
  })

  describe('update compose test', () => {
    it('should return sql string', () => {
      const sqlStrs = utils.composeUpdateExecString('tags', [
        'num',
        'str',
      ], [
        'id',
        'other',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        UPDATE tags
        SET num=@num,str=@str
        WHERE id=@id AND other=@other
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })

    it('should return sql string with camel case style', () => {
      const sqlStrs = utils.composeUpdateExecString('tags', [
        'numId',
        'strId',
      ], [
        'id',
        'otherId',
      ]).split(/\s/).filter(item => item !== '')

      const expectStrs = `
        UPDATE tags
        SET num_id=@numId,str_id=@strId
        WHERE id=@id AND other_id=@otherId
      `.split(/\s/).filter(item => item !== '')

      sqlStrs.should.be.deep.equal(expectStrs)
    })
  })
})
