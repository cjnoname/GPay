
export const SocialButtonStyle = () => {
  return ({
    buttonContainer: {
      textAlign: 'right' as 'right',
      width: '100%',
      marginTop: '2em',
      '& button': {
        '& span': {
          width: '100%'
        }
      }
    },
    button: {
      color: '#fff',
      textTransform: 'none' as 'none',
      fontWeight: 600 as 600,
      fontSize: '0.9em',
      height: '3.2em'
    },
    icon: {
      fontSize: 26
    },
    text: {
      width: `calc(100% - 26px)`
    }
  });
};
