import { VoterService } from './voter.service';
import { ISession } from '../shared';
import { Observable, of } from 'rxjs';

describe('VoterService', () => {

  let voterService: VoterService,
    mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      const sessions = {id: 6, voters: ['joe', 'john']};
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, <ISession>sessions, 'joe');

      expect(sessions.voters.length).toBe(1);
      expect(sessions.voters[0]).toBe('john');
    });
  });

});
